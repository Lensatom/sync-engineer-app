import { GET } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = ({ status } : { status: 'ACTIVE' | 'ASSIGNED' | 'RESOLVED' | 'UNRESOLVED' | 'REASSIGNED' }) => {
  const { data: tasks, ...rest } = useQuery({
    queryKey: ["tasks", status],
    queryFn: async () => {
      const response = await GET({
        route: `/tasks/engineer?status=${status}`,
      });
      return response.data;
    }
  });

  console.log("useGetTasks tasks:", tasks);

  return { tasks, ...rest };
};

export const useGetTaskById = ({ id } : { id: string }) => {
  const { data: task, ...rest } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await GET({
        route: `/tasks/${id}`,
      });
      return response.data;
    }
  });

  console.log("useGetTaskById task:", task);

  return { task, ...rest };
};