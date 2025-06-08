type ProjectDates = {
  startDate: string | Date;
  deadline: string | Date;
};

export const calculateRemainingDays = ({ startDate, deadline }: ProjectDates) => {
  const deadlineTime = new Date(deadline).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = deadlineTime - currentTime;

  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-GB");
  const formattedDeadline = new Date(deadline).toLocaleDateString("en-GB");

  return {
    remainingDays,
    formattedStartDate,
    formattedDeadline,
  };
};
