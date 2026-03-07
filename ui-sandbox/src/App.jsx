import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { evaluateProfile } from './engine-adapter/evaluateProfile'
import { projectProfile } from './engine-adapter/runProjection'
import { useSandboxData } from './lib/dataLoader'
import { DashboardPage } from './pages/DashboardPage'
import { DecisionPage } from './pages/DecisionPage'
import { GraphPage } from './pages/GraphPage'
import { GuidedStartPage } from './pages/GuidedStartPage'
import { ProfilesPage } from './pages/ProfilesPage'
import { ProjectionPage } from './pages/ProjectionPage'
import { ScenariosPage } from './pages/ScenariosPage'

const ROUTES = [
  { path: '/start', label: 'Start Here' },
  { path: '/dashboard', label: 'Your Plan' },
  { path: '/decision', label: 'Decision' },
  { path: '/projection', label: 'Projection' },
  { path: '/scenarios', label: 'Scenarios' },
  { path: '/profiles', label: 'Advanced Profiles' },
  { path: '/graph', label: 'Graph' },
]

function App() {
  const { profiles, scenarioProfiles, nodes, loading, error } = useSandboxData()
  const [selectedProfileId, setSelectedProfileId] = useState('')
  const [activeProfile, setActiveProfile] = useState(null)
  const [lastRun, setLastRun] = useState(null)
  const [projectionSteps, setProjectionSteps] = useState(5)
  const [projectionRun, setProjectionRun] = useState([])

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.profile_id === selectedProfileId) ?? null,
    [profiles, selectedProfileId],
  )
  const nodesById = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.decision_id, node])),
    [nodes],
  )

  const runNow = () => {
    if (!activeProfile) return
    setLastRun(evaluateProfile(activeProfile, nodes))
  }

  const runProjectionNow = () => {
    if (!activeProfile) return
    setProjectionRun(projectProfile(activeProfile, nodes, projectionSteps))
  }

  useEffect(() => {
    if (selectedProfile) {
      setActiveProfile(selectedProfile)
    }
  }, [selectedProfile])

  useEffect(() => {
    if (!activeProfile) {
      setLastRun(null)
      setProjectionRun([])
      return
    }
    const evaluated = evaluateProfile(activeProfile, nodes)
    setLastRun(evaluated)
    setProjectionRun(projectProfile(activeProfile, nodes, 5))
  }, [activeProfile, nodes])

  if (loading) {
    return <div className="app-shell">Loading local sandbox data...</div>
  }

  if (error) {
    return <div className="app-shell">Failed to load local data: {error}</div>
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>Universal Decision Engine</h1>
        <div className="toolbar">
          <select
            value={selectedProfileId}
            onChange={(event) => setSelectedProfileId(event.target.value)}
          >
            <option value="">Quick switch (advanced profiles)</option>
            {profiles.map((profile) => (
              <option key={profile.profile_id} value={profile.profile_id}>
                {profile.profile_id}
              </option>
            ))}
          </select>
          <button onClick={runNow} disabled={!selectedProfile}>
            Run
          </button>
        </div>
        <nav className="route-nav">
          {ROUTES.map((route) => (
            <NavLink key={route.path} to={route.path}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/start"
            element={
              <GuidedStartPage
                onApplyProfile={(profile) => {
                  setSelectedProfileId('')
                  setActiveProfile(profile)
                }}
              />
            }
          />
          <Route path="/dashboard" element={<DashboardPage profile={activeProfile} run={lastRun} />} />
          <Route
            path="/profiles"
            element={
              <ProfilesPage
                profiles={profiles}
                selectedProfileId={selectedProfileId}
                setSelectedProfileId={setSelectedProfileId}
              />
            }
          />
          <Route
            path="/decision"
            element={<DecisionPage run={lastRun} selectedProfile={activeProfile} nodesById={nodesById} />}
          />
          <Route
            path="/projection"
            element={
              <ProjectionPage
                steps={projectionSteps}
                setSteps={setProjectionSteps}
                run={projectionRun}
                selectedProfile={activeProfile}
                onRunProjection={runProjectionNow}
                nodesById={nodesById}
              />
            }
          />
          <Route
            path="/scenarios"
            element={<ScenariosPage scenarios={scenarioProfiles} nodes={nodes} />}
          />
          <Route path="/graph" element={<GraphPage nodes={nodes} nodeStates={lastRun?.node_states || []} />} />
          <Route path="*" element={<Navigate to="/start" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
