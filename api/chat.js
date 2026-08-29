export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { contents } = req.body || {};

    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({ error: "Falta el historial de conversación" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Falta GEMINI_API_KEY en Vercel" });
    }

    const SYSTEM_INSTRUCTION = `Eres el asistente oficial de Juguería Elbia, una juguería peruana de jugos naturales, sándwiches y ensaladas de frutas.

Responde SIEMPRE en español, de forma amable, cercana y entusiasta (máximo 3-4 oraciones).

Productos reales de la carta:
- Jugos: Papaya (S/8), Fresa (S/9), Mango (S/9.50), Surtido Elbia (S/10), Especial de la Casa (S/13)
- Sándwiches: Pollo deshilachado (S/7.50), Pollo con palta (S/9), Mixto jamón y queso (S/7), Especial Elbia (S/12)
- Extras: Ensalada de frutas clásica (S/11), Ensalada con yogurt y cereal (S/13.50)

Reglas:
1. Recomienda según lo que el cliente pide.
2. Menciona beneficios de forma natural.
3. Respeta alergias o restricciones.
4. Si preguntan por pedido, indica usar el carrito o WhatsApp.
5. No inventes precios ni digas que tomas pedidos.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 400
          }
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return res.status(geminiResponse.status).json({
        error: data.error?.message || "Error de la API de Gemini"
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}