import { POST } from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutateAsync: login, ...rest } = useMutation({
    mutationKey: ["user"],
    mutationFn: async ({ email }: { email: string }) => {
      const response = await POST({
        route: "/auth/login",
        data: { email },
      });
      return response;
    },
  });

  return { login, ...rest };
};

export const useRegister = () => {
  const { mutateAsync: register, ...rest } = useMutation({
    mutationKey: ["user"],
    mutationFn: async ({ email }: { email: string }) => {
      const response = await POST({
        route: "/auth/register",
        data: { email },
      });
      return response;
    },
  });

  return { register, ...rest };
};
