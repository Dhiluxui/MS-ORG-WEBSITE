import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record, old_record, type } = await req.json()

  const announcementsWebhook = Deno.env.get('DISCORD_WEBHOOK_ANNOUNCEMENTS')
  const adminAlertWebhook = Deno.env.get('DISCORD_WEBHOOK_ADMIN_ALERTS')

  const post = (url: string, content: string) =>
    fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ content }) })

  if (type === 'UPDATE') {
    // Tournament just went FULL
    if (record.status === 'full' && old_record.status !== 'full') {
      if(announcementsWebhook) {
        await post(announcementsWebhook,
          `🔴 **${record.name}** is now **FULL**! ${record.total_slots}/${record.total_slots} slots taken. No more registrations accepted.`)
      }
    }
    // Tournament went LIVE
    if (record.status === 'live' && old_record.status !== 'live') {
      if(announcementsWebhook) {
        await post(announcementsWebhook,
          `🏆 **${record.name}** IS NOW LIVE! Best of luck to all teams! 🎮\n> Prize Pool: ₹${record.prize_pool?.toLocaleString()}`)
      }
    }
    // Tournament COMPLETED
    if (record.status === 'completed' && old_record.status !== 'completed') {
      if(announcementsWebhook) {
        await post(announcementsWebhook,
          `✅ **${record.name}** is complete! Final results are live on the website.`)
      }
    }
    // Tournament CANCELLED
    if (record.status === 'cancelled' && old_record.status !== 'cancelled') {
      if(adminAlertWebhook) {
        await post(adminAlertWebhook,
          `⚠️ ADMIN ALERT: Tournament **${record.name}** was CANCELLED.`)
      }
    }
  }

  return new Response('OK', { status: 200 })
})
