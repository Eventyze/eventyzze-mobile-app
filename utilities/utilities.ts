export const formatDate = (date:any) => {
const parts = date.split(" ");
const formattedDate = `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
return formattedDate
}

export const formatDate2 = (date:any) => {
    const parts = date.split(" ");
    const formattedDate = `${parts[0]}`;
    return formattedDate
    }

export const isDateStrictlyBefore = (dateToCheck:any, referenceDate:any) => {
    const dateWithTime = new Date(dateToCheck);
    
    const refDate = new Date(`${referenceDate}T00:00:00.000Z`);
    
    const dateToCheckDateOnly = new Date(dateWithTime.toISOString().split('T')[0]);
    
    if (dateToCheckDateOnly >= refDate) {
      return false
    }
    
    return true;
  };