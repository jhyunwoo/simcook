import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function PUT(request: Request) {
  const requestData = await request.json();
  const { recipe, userInfo } = requestData;
  const openai = new OpenAI({
    apiKey: "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",
  });

  const customRecipe = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "너는 건강한 식단을 구성해주는 영양사야",
      },
      {
        role: "user",
        content: ` 나에 맞게 ${recipe?.foodName} 레시피를 다시 만들어줘. 레시피는 ${JSON.stringify({ recipe })}이야 나는 이런 사람이야: ${JSON.stringify({ userInfo })}`,
      },
    ],
    model: "gpt-4-turbo-preview",
  });

  return NextResponse.json({ result: customRecipe.choices[0].message.content });
}
