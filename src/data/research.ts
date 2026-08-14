export type ResearchStatus = 'in-progress' | 'published' | 'coming-soon'

export interface ResearchItem {
  id: number
  status: ResearchStatus
  field: string
  title: string
  description: string
  tags: string[]
  date: string | null
  pdfUrl: string | null
  paperUrl: string | null
}

export const research: ResearchItem[] = [
  {
    id: 1,
    status: 'in-progress',
    field: 'ASTRODYNAMICS',
    title: 'A Numerical Study of Earth–Mars Transfer Trajectories',
    description:
      'Investigating how departure velocity influences Δv, transfer time, and trajectory efficiency through numerical simulation.',
    tags: ['Orbital Mechanics', 'Numerical Simulation', 'Trajectory Design'],
    date: '2026',
    pdfUrl: null,
    paperUrl: null,
  },
]
