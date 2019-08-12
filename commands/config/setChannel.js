module.exports = async (msg, command, args, config) => {
  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')
  const channel = msg.mentions.channels.first();
  if (!channel) return msg.reply('Channel not found.')

  if (args[0] == 'vote') {
    await global.Database.query('UPDATE `servers` SET channel_vote_id = ? WHERE (server_id = ?)', [channel.id, msg.guild.id])
  } else if (args[0] == 'rules') {
    await global.Database.query('UPDATE `servers` SET channel_rules_id = ? WHERE (server_id = ?)', [channel.id, msg.guild.id])
  } else {
    return msg.reply('Channel Name Not Recognized.')
  }
  return msg.reply('Updated.')
}
