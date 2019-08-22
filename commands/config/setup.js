module.exports = async (msg, command, args, config) => {
  const messageFilter = m => m.author.id == msg.author.id;

  const admin = await global.Database.isAdmin(msg.member, config);
  if (!admin) return msg.reply('Sorry, you do not have the administrator role or the Manage Server permission.')

  // Rules Channel
  msg.reply("What channel do you want rules to appear in?");
  let rulesChannel = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 10000
  })
  rulesChannel = rulesChannel.first();
  if (!rulesChannel) return msg.reply('Cancelling.')
  let channel = rulesChannel.mentions.channels.first()
  if (!channel) return msg.reply('Channel not found.')
  if (channel.guild.id != msg.guild.id) return msg.reply('Channel not found.');
  await global.Database.query('UPDATE `servers` SET channel_rules_id = ? WHERE (server_id = ?)', [channel.id, msg.guild.id])

  // Voting Channel
  msg.reply("What channel do you want the votes to appear in?");
  let votesChannel = await msg.channel.awaitMessages(messageFilter, {
    maxMatches: 1,
    time: 10000
  })
  votesChannel = votesChannel.first();
  if (!votesChannel) return msg.reply('Cancelling.')
  channel = votesChannel.mentions.channels.first()
  if (!channel) return msg.reply('Channel not found.')
  if (channel.guild.id != msg.guild.id) return msg.reply('Channel not found.');
  await global.Database.query('UPDATE `servers` SET channel_vote_id = ? WHERE (server_id = ?)', [channel.id, msg.guild.id])

  return msg.reply('Done! Now run `d!help` for a list of commands.')
}
