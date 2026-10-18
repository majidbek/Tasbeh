// handlers/message.js — har bir xabarda Mini App'ni ochish tugmasini yuboradi
// va botning menyu tugmasini Mini App'ga bog'laydi.

import { api } from 'sdk';
import { APP_URL } from '../lib/config.js';
import { SUPPORT_CONTACT } from '../lib/support.js';

export default async function (message) {
  if (message.chat.type !== 'private') return;

  // Stars xayriyasi muvaffaqiyatli o'tdi.
  if (message.successful_payment) {
    const stars = message.successful_payment.total_amount;
    await api.sendMessage({
      chat_id: message.chat.id,
      text: `Rahmat! ${stars} ⭐ xayriyangiz qabul qilindi. Alloh qabul qilsin va rozi bo‘lsin! 🤲`,
    });
    return;
  }

  // Telegram to'lov qoidalari bo'yicha majburiy buyruq.
  if (message.text === '/paysupport') {
    await api.sendMessage({
      chat_id: message.chat.id,
      text: 'To‘lov bo‘yicha savol yoki muammo bo‘lsa, ' +
        (SUPPORT_CONTACT ? `${SUPPORT_CONTACT} ga yozing.` : 'bot egasiga murojaat qiling.') +
        ' Xayriyalar ixtiyoriy; xato to‘lov bo‘lsa, yozing — ko‘rib chiqamiz.',
    });
    return;
  }

  if (!APP_URL) {
    await api.sendMessage({ chat_id: message.chat.id, text: 'Tasbeh hali sozlanmoqda, birozdan keyin urinib ko‘ring.' });
    return;
  }

  // Pastki chapdagi menyu tugmasi barcha foydalanuvchilar uchun Mini App'ni ochadi.
  await api.setChatMenuButton({
    menu_button: { type: 'web_app', text: 'Tasbeh', web_app: { url: APP_URL } },
  });

  await api.sendMessage({
    chat_id: message.chat.id,
    text: 'Assalomu alaykum! 📿 Online Tasbeh — zikrlaringizni sanang, maqsad qo‘ying va davralarni kuzating.',
    reply_markup: {
      inline_keyboard: [[{ text: '📿 Tasbehni ochish', web_app: { url: APP_URL } }]],
    },
  });
}
