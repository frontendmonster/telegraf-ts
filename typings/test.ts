/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-shadow */

// This is a test file for the TypeScript typings.
// It is not intended to be used by external users.
import {
  Telegraf,
  Markup,
  Middleware,
  TelegrafContext,
  Composer,
  TOptions,
  Telegram,
} from './index';
import { EntityType, BotCommand, MessageDice } from './telegram-types';

const randomPhoto = 'https://picsum.photos/200/300/?random';
const sayYoMiddleware: Middleware<TelegrafContext> = ({ reply }, next) =>
  reply('yo').then(() => next?.());

const { reply } = Telegraf;

const bot = new Telegraf(process.env.BOT_TOKEN || '');

// Logs each request
bot.use(Telegraf.log());

bot.start(ctx => ctx.reply('Bot started!'));

// Login widget events
bot.on('connected_website', ({ reply }) => reply('Website connected'));

bot.command('cat', ({ replyWithPhoto }) => replyWithPhoto(randomPhoto));

// Look ma, reply middleware factory
bot.command('foo', reply('http://coub.com/view/9cjmt'));

bot.action('bar', reply('i was here'));

bot.telegram.sendMessage(process.env.BOT_CLIENT_ID || '', 'It works');

// Start https webhook
bot.startWebhook('/secret-path', {}, 8443);

// Http webhook, for nginx/heroku users.
bot.startWebhook('/secret-path', null, 5000);

// Start polling
bot.startPolling();

// Launch - webhook
bot.launch({ webhook: {} }); // Technically, all webhook parameters are optional, but in this case launch throws an exception
bot.launch({
  webhook: {
    domain: 'https://---.localtunnel.me',
    port: 3000,
    hookPath: '/telegraf/mybot',
    tlsOptions: null,
    host: '127.0.0.1',
    cb: (): void => {},
  },
});

// Launch - polling
bot.launch({ polling: {} });
bot.launch({
  polling: {
    timeout: 30,
    limit: 100,
    allowedUpdates: null,
    stopCallback: (): void => {},
  },
});

// tt.ExtraXXX
bot.hears('something', async (ctx) => {
    // tt.ExtraReplyMessage
    ctx.reply('Response', {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.keyboard([])
    })

    // tt.ExtraAudio
    ctx.replyWithAudio('somefile', {
        caption: '',
        duration: 0,
        performer: '',
        title: '',
        thumb: '',
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraDocument
    ctx.replyWithDocument('document', {
        thumb: '',
        caption: '',
        parse_mode: "HTML",
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraGame
    ctx.replyWithGame('game', {
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraLocation
    ctx.replyWithLocation(0, 0, {
        live_period: 60,
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    ctx.editMessageLiveLocation(90,90, {
        reply_markup: Markup.inlineKeyboard([])
    })

    ctx.stopMessageLiveLocation({
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraPhoto
    ctx.replyWithPhoto('', {
        caption: '',
        parse_mode: 'HTML',
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraMediaGroup
    ctx.replyWithMediaGroup([], {
        disable_notification: false,
        reply_to_message_id: 0
    })

    // tt.ExtraSticker
    ctx.replyWithSticker('', {
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraVideo
    ctx.replyWithVideo('', {
        duration: 0,
        width: 0,
        height: 0,
        thumb: '',
        caption: '',
        supports_streaming: false,
        parse_mode: "HTML",
        disable_notification: true,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    // tt.ExtraVoice
    ctx.replyWithVoice('', {
        caption: '',
        parse_mode: "Markdown",
        duration: 0,
        disable_notification: false,
        reply_to_message_id: 0,
        reply_markup: Markup.inlineKeyboard([])
    })

    ctx.telegram.sendVideoNote(-1, "", {
        duration: 0,
        length: 0,
        thumb: '',
        parse_mode: "HTML",
        disable_notification: false,
        disable_web_page_preview: false,
        reply_markup: Markup.inlineKeyboard([]),
        reply_to_message_id: 0,
    })

    const setMyCommandsResult: boolean =  await ctx.telegram.setMyCommands([
        {
            command: '',
            description: ''
        },
    ])

    const myCommands: BotCommand[] = await ctx.telegram.getMyCommands()

    const messageDice: MessageDice = await ctx.telegram.sendDice(0, {
        disable_notification: false,
        reply_markup: Markup.inlineKeyboard([]),
        reply_to_message_id: 0
    })

    const replyWithDiceMessage: MessageDice = await ctx.replyWithDice({
        disable_notification: false,
        reply_markup: Markup.inlineKeyboard([]),
        reply_to_message_id: 0
    })
})

// Markup

const markup = new Markup
markup.keyboard([Markup.button('sample')], {})
Markup.inlineKeyboard([Markup.callbackButton('sampleText', 'sampleData')], {})
Markup.inlineKeyboard([Markup.callbackButton('sampleCallbackButton', 'sampleData'), Markup.urlButton('sampleUrlButton', 'https://github.com')], {})

// #761
bot.telegram.sendPhoto(1, randomPhoto, {
  caption: '*Caption*',
  parse_mode: 'Markdown',
});

const formattedString = Markup.formatHTML("Добрейшего вечерочка дня", [
  { offset: 0, length: 10, type: "bold" as EntityType },
  { offset: 11, length: 9, type: "strikethrough" as EntityType }
]);
// type MiddlwareOrCmposer

const composer = new Composer();
const fooMiddleware: Middleware<TelegrafContext> = ctx => ctx.reply('foo');
const barMiddleware: Middleware<TelegrafContext> = ctx => ctx.reply('bar');
const bazMiddleware: Middleware<TelegrafContext> = ctx => ctx.reply('baz');

const otherComposer = new Composer(composer, bazMiddleware, bazMiddleware);
Composer.compose([composer, bazMiddleware, bazMiddleware]);
Composer.mount('callback_query', composer, bazMiddleware, bazMiddleware);
Composer.hears('hear', composer, bazMiddleware, bazMiddleware);
Composer.action('action', composer, bazMiddleware, bazMiddleware);
Composer.optional(true, composer, bazMiddleware, bazMiddleware);
Composer.branch(true, composer, bazMiddleware);
Composer.chatType('channel', composer, bazMiddleware);
Composer.privateChat(composer, bazMiddleware);
Composer.groupChat(composer, bazMiddleware);

composer.use(fooMiddleware, barMiddleware, otherComposer);
composer.on('animation', barMiddleware, otherComposer);
composer.hears('animation', barMiddleware, otherComposer);
composer.action('animation', barMiddleware, otherComposer);
composer.command('animation', barMiddleware, otherComposer);
composer.gameQuery(barMiddleware, otherComposer);
composer.start(barMiddleware, otherComposer);
composer.help(barMiddleware, otherComposer);

bot.use(composer, otherComposer, fooMiddleware);

// Custom Context

class CustomContext extends TelegrafContext {
  constructor(update: any, telegram: Telegram, options: TOptions) {
    console.log('Creating contexy for %j', update);
    super(update, telegram, options);
  }

  reply(...args: any) {
    console.log('reply called with args: %j', args);
    return super.reply('OK');
  }
}

const customContextBot = new Telegraf<CustomContext>('', {
  contextType: CustomContext,
});

const middleware: Middleware<TelegrafContext> = ctx => {
  ctx.replyWithMediaGroup([
    {
      type: 'photo',
      media: { source: 'source' },
    },
    {
      type: 'photo',
      media: { source: 'source' },
    },
    {
      type: 'video',
      media: 'source',
    },
  ]);
};

// Telegram
const middleware2: Middleware<TelegrafContext> = ctx => {
  // unbanChatMember
  ctx.telegram.unbanChatMember(100, 1000);
  ctx.telegram.unbanChatMember('100', 1000);
};
