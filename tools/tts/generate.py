"""Zikrlar talaffuzini public/audio/ ga yaratadi (GitHub Actions'da ishlaydi).

Matnlar tools/tts/dhikr.json da; tartibi public/index.html dagi DH ro'yxati bilan bir xil.
Oxirgi harflar sukun bilan yozilgan — vaqf (to'xtab o'qish) talaffuzi uchun.
"""
import asyncio, json, pathlib
import edge_tts

VOICE = "ar-SA-HamedNeural"
ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "audio"

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for item in json.loads((ROOT / "tools/tts/dhikr.json").read_text(encoding="utf-8")):
        await edge_tts.Communicate(item["text"], VOICE, rate="-15%").save(str(OUT / item["file"]))
        print("ok", item["file"], item["text"])

asyncio.run(main())
