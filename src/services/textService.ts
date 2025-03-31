import googleAI from '../config/googleAI';
import { saveText } from '../models/textModel';
import { Text } from '../types/Text';

export const generateText = async (): Promise<string> => {
  try {
    // Instancia del modelo Gemini
    const model = googleAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Solicitud para generar un texto breve y sencillo para aprender inglés
    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: "Generate a simple and short English story for learning. A pleasant everyday situation like a walk in the park, a visit to the store, or a family activity." }]
        }
      ]
    });

    // Extraer el contenido generado
    const content = response.response.text().trim() || 'No text generated';
    const topic = "Aprender inglés"; // Tema definido por separado

    // Crear el objeto Text separando claramente el tema y el contenido
    const newText: Text = { topic, content };

    console.log('Nuevo texto generado:', newText);
    await saveText(newText); // Guardar en la base de datos

    // Retornar el contenido
    return content;
  } catch (error) {
    console.error('Error al obtener el texto desde Google AI:', error);

    // Texto de prueba en caso de error
    const testText = 'Texto generado de prueba: Hoy fui a la tienda y compré frutas frescas.';
    const topic = "Aprender inglés"; // Tema de prueba

    const newText: Text = { topic, content: testText };
    await saveText(newText);

    return testText;
  }
};
