"""Zikrlar talaffuzini public/audio/ ga yaratadi (GitHub Actions'da ishlaydi).

Matnlar tools/tts/dhikr.json da; tartibi public/index.html dagi DH ro'yxati bilan bir xil.
Oxirgi harflar sukun bilan yozilgan — vaqf (to'xtab o'qish) talaffuzi uchun.
"""
import asyncio, json, pathlib
import edge_tts

VOICE = "ar-SA-HamedNeural"
ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "audio"

async def synth(text, path):
    try:
        await edge_tts.Communicate(text, VOICE, rate="-15%").save(str(path))
        return "edge"
    except Exception as e:  # Microsoft xizmati rad etsa — Google TTS zaxira
        print("edge-tts xato:", e)
        from gtts import gTTS
        gTTS(text, lang="ar", slow=True).save(str(path))
        return "gtts"

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for item in json.loads((ROOT / "tools/tts/dhikr.json").read_text(encoding="utf-8")):
        src = await synth(item["text"], OUT / item["file"])
        print("ok", src, item["file"], item["text"])

asyncio.run(main())
