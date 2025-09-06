import { GoogleGenAI } from "@google/genai";
import  'dotenv/config'


export class GeminiAI{
  
  async responderTexto(prompt){
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const respostajson= {"RespostaAI": response.text};
    return respostajson;
  }
  
  async responderImg(prompt, imageBase64){
    let img64pura;

    if(imageBase64.split(',')[1]==undefined){
      img64pura=imageBase64;
    }
    else{
      img64pura= imageBase64.split(',')[1]
    }
    

    const ai = new GoogleGenAI({});
    const contents = [
      {
        inlineData: {
          mimeType: "image/png",
          data: img64pura,
        },
      },
      { text: prompt},
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    const respostajson= {"RespostaAI": response.text};
    return respostajson;
  }


}
