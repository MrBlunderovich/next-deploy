import { checkUser } from "../login/actions";

export async function POST(request: Request) {
  //TODO: rate limiting

  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  try {
    const user = await checkUser(email, password);
    return Response.json(user);
  } catch (error) {
    console.log(error);

    return new Response("User not found", {
      status: 401,
    });
  }
}
