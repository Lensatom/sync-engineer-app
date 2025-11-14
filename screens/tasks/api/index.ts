import { GET, PATCH } from "@/config/axios";
import { queryClient } from "@/config/tanstack";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useUpdateTaskStatus = ({
  id
}: { id: string }) => {
  const { mutateAsync:updateTaskStatus, ...rest } = useMutation({
    mutationKey: ["tasks", id],
    mutationFn: async ({status}: {status: string}) => {
      await PATCH({
        route: `/tasks/${id}/status`,
        data: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return { updateTaskStatus, ...rest };
};

export const useGetDiagnosisReport = ({ id } : { id: string }) => {
  const { data: report, ...rest } = useQuery({
    queryKey: ["tasks", id, "diagnostic-report"],
    queryFn: async () => {
      const response = await GET({
        route: `/tasks/${id}/diagnostic-report`
      });
      return response.data;
    }
  });

  console.log("useGetDiagnosisReport report:", report);

  return { report, ...rest };
};

export const useGetIssueHistory = ({ id } : { id: string }) => {
  const { data: history, ...rest } = useQuery({
    queryKey: ["tasks", id, "issue-history"],
    queryFn: async () => {
      const response = await GET({
        route: `/tasks/atm/history/${id}`
      });
      return response.data;
    }
  });

  console.log("useGetIssueHistory history:", history);

  return { history, ...rest };
};