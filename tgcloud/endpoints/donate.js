// endpoints/donate.js — Mini App'dan chaqiriladi: Telegram Stars (XTR) bilan
// xayriya uchun to'lov havolasini yaratadi. Mini App uni openInvoice bilan ochadi.

import { api, EndpointError } from 'sdk';

export default async function (input, ctx) {
  const user = ctx.initData.user;
  if (!user) throw new EndpointError('Foydalanuvchi aniqlanmadi', { code: 'NO_USER' });

  const amount = Number(input.amount);
  if (!Number.isInteger(amount) || amount < 1 || amount > 10000) {
    throw new EndpointError('Miqdor 1 dan 10000 ⭐ gacha bo‘lishi kerak', { code: 'BAD_AMOUNT' });
  }

  const url = await api.createInvoiceLink({
    title: 'Tasbeh’ni qo‘llab-quvvatlash',
    description: `${amount} ⭐ xayriya — ilovani rivojlantirishga yordam. Alloh rozi bo‘lsin!`,
    payload: `donate:${user.id}:${amount}`,
    currency: 'XTR', // Telegram Stars: provider_token kerak emas
    prices: [{ label: 'Xayriya', amount }],
  });
  return { url };
}
