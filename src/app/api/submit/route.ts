import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldige JSON' }, { status: 400 })
  }

  const submission = {
    receivedAt: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for') || null,
    userAgent: req.headers.get('user-agent') || null,
    data: body,
  }

  console.log('[form/submit]', JSON.stringify(submission))

  try {
    const dir = process.env.SUBMISSIONS_DIR || path.join(process.cwd(), '.submissions')
    await fs.mkdir(dir, { recursive: true })
    const file = path.join(dir, `submission-${Date.now()}.json`)
    await fs.writeFile(file, JSON.stringify(submission, null, 2), 'utf8')
  } catch (err) {
    console.warn('[form/submit] kon niet naar schijf schrijven:', err)
  }

  return NextResponse.json({ ok: true })
}
