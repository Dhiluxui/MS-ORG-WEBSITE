import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record, old_record, type } = await req.json()
  const roomInfoWebhook = Deno.env.get('DISCORD_WEBHOOK_ROOM_INFO')
  
  const post = (url: string, content: string) =>
    fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ content }) })

  if (type === 'UPDATE') {
    if (record.status === 'approved' && old_record.status !== 'approved') {
      if (roomInfoWebhook) {
        await post(roomInfoWebhook,
          `✅ **${record.team_name}** has been approved! Welcome aboard! 🎮\nRoom details will be sent 30 min before your first match.`)
      }
    }
  }

  return new Response('OK', { status: 200 })
})
