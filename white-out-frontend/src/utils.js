const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October",
    "November",
    "December" 
]

const days = [
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday",
    "Saturday",
    "Sunday"
]

export const getDayOfWeek = (fullpath) => {

    const year = fullpath.substring(0,4);
    const month = convertHumanMonthToInteger(fullpath.substring(4,6));
    const day = fullpath.substring(6,8);

    const date = new Date(year, month, day);

    return days[date.getDay()];

};

export const getMonth = (fullpath) => {
    //Do something with the input

    const year = fullpath.substring(0,4);
    const month = convertHumanMonthToInteger(fullpath.substring(4,6));
    const day = fullpath.substring(6,8);

    const date = new Date(year, month, day);

    return months[date.getMonth()];

}

export const getDate = (fullpath) => {
    //Do something with the input

    const year = fullpath.substring(0,4);
    const month = convertHumanMonthToInteger(fullpath.substring(4,6));
    const day = fullpath.substring(6,8);

    const date = new Date(year, month, day);

    return date.getDate();

}

export const getYear = (fullpath) => {
    const year = fullpath.substring(0,4);
    const month = convertHumanMonthToInteger(fullpath.substring(4,6));
    const day = fullpath.substring(6,8);

    const date = new Date(year, month, day);

    return date.getFullYear();

}

export const getMonthFromInteger = (monthInt) => {
    return months[monthInt];
}

export const getBedName = (bed_id) => {

    if (bed_id.includes("king")) {
        return "King";
    } else if (bed_id.includes("queen")) {
        return "Queen";
    } else if (bed_id.includes("bunk")) {
        return "Bunk Bed";
    } else if (bed_id.includes("couch")) {
        return "Couch";
    } else {
        return bed_id;
    }

}

export const isPastDate = (fullpath) => {

    const year = fullpath.substring(0,4);
    const month = convertHumanMonthToInteger(fullpath.substring(4,6));
    const day = fullpath.substring(6,8);

    const date = new Date(year, month, day).getTime();
    
    let dateObj = new Date();
    let now = dateObj.setDate(dateObj.getDate() - 1);

    return date < now;
    
}

export const convertHumanMonthToInteger = (month) => {

    if (month === 1) {
        return 0;
    } else if (month === 12) {
        return 11;
    } else {
        return month - 1;
    }

}

export const beds = [
    {
        bed_id: "double_1",
        bed_name: "Double Bed 1",
        bed_description: "This is double bed 1",
    },
    {
        bed_id: "double_2",
        bed_name: "Double Bed 2",
        bed_description: "This is double bed 2",
    },
    {
        bed_id: "double_3",
        bed_name: "Double Bed 3",
        bed_description: "This is double bed 3",
    },
    {
        bed_id: "double_4",
        bed_name: "Double Bed 4",
        bed_description: "This is double bed 4",
    },
    {
        bed_id: "bunk_1",
        bed_name: "Bunk Bed 1",
        bed_description: "This is bunk bed 1",
    }
]

export const userIsTenant = (user_email) => {

    const index = lessees.findIndex((lessee) => lessee.user_email === user_email);

    if (index === -1) {
        return false;
    } else {
        return true;
    }
  }