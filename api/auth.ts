import { GET, POST } from "@/config/axios";
import { setAccessToken } from "@/helpers/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutateAsync:login, ...rest } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: async ({email}: {email: string}) => {
      const response = await POST({
        route: "/auth/login",
        data: { email },
      });
      setAccessToken(response.data.token)
    }
  });

  return { login, ...rest };
};

export const useRetrieveUser = () => {
  const { data: user, ...rest } = useQuery({
    queryKey: ["user-me"],
    queryFn: async () => {
      const response = await GET({
        route: "/user/me",
      });
      return response.data;
    }
  });

  console.log("useRetrieveUser user:", user);

  return { user, ...rest };
};