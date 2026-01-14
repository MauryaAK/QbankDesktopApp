import axios from 'axios';
import axiosInstance from './axiosInstance';
import { format } from 'date-fns';
import { getBaseUrl } from './getBaseUrl';




//---------------------------Login Logout API's-----------------------------------
export const getUserDetails = async (payload: {
  loginId: string;
  password: string;
  deviceFingerprint: string;
  isOverride: boolean;
}) => {
  return axiosInstance.post("/Home/GetUserDetails", payload);
};

export const logout = async (payload: { userId: number }) => {
  const response = await axios.post(getBaseUrl() + "/Home/Logout", payload);
  return response.data;
};

export const checkDeviceRegister = async (payload: {
  deviceName: string;
  deviceFingerprint: string;
  deviceMode: string;
}) => {
  return axiosInstance.post("Home/RegisterDevice", payload);
};



//---------------------------------------------dashboard API's list-----------------------------------
export const getCandidateList = async () => {
  const today = format(new Date(), "dd-MM-yyyy");
  //  const today = format(subDays(new Date(), 3), "dd-MM-yyyy");
  return axiosInstance.post("/Admin/GetCandidateDashboard", {
    startDate: today,
    endDate: today,
  });
};





// ------------------------------------admin apis ----------------------

export const getRoleMaster = async () => {
  return axiosInstance.get(`/Admin/GetRoleMaster`);
};

export const addEditRoleMaster = async (payload) => {
  return axiosInstance.post("/Admin/AddEditRoleMaster", payload)
};


export const getUserMaster = async () => {
  return axiosInstance.get(`/Admin/GetUserMaster`);
};

export const addEditUserMaster = async (payload) => {
  return axiosInstance.post("/Admin/AddEditUserMaster", payload)
};

export const getAircraftType = async () => {
  return axiosInstance.get(`/Admin/GetAircraftType`);
};

export const addEditAircraftType = async (payload) => {
  return axiosInstance.post("/Admin/AddEditAircraftType", payload)
};

export const getAtaType = async () => {
  return axiosInstance.get(`/Admin/GetAtaType`);
};

export const addEditAtaType = async (payload) => {
  return axiosInstance.post("/Admin/AddEditAtaType", payload)
};


export const getDoDontRule = async () => {
  return axiosInstance.get(`/Admin/GetDoDontRule`);
};

export const addEditDoDontRule = async (payload) => {
  return axiosInstance.post("/Admin/AddEditDoDontRule", payload)
};

export const getDeviceMaster = async () => {
  return axiosInstance.get(`/Admin/GetDeviceMaster`);
};

export const activateDevice = async (payload) => {
  return axiosInstance.post("/Admin/ActivateDevice", payload)
};

export const updatePassword = async (payload) => {
  return axiosInstance.post("/Admin/UpdatePassword", payload)
};






//-----------------------------------------Question API's-----------------------------------------------

export const getQuestionList = async ({ queryKey }: any) => {
  const [, userId] = queryKey;
  return axiosInstance.get(
    `/Question/GetQuestionMaster?UserId=${userId}&IsDashboard=True`
  );
};

export const addEditQuestion = async (payload) => {
  return axiosInstance.post("/Question/AddEditQuestion", payload)
};

export const getQuestionForChecking = async () => {
  return axiosInstance.get(`/Question/GetQuestionForChecking`);
};

export const updatedQuestionList = async (payload) => {
  return axiosInstance.post("/Question/CheckQuestion", payload)
};

export const getQuestionForVerification = async () => {
  return axiosInstance.get(`/Question/GetQuestionForVerification`);
};

export const updatedVerifyQuestion = async (payload) => {
  return axiosInstance.post("/Question/VerifyQuestion", payload)
};




//-----------------------------------------Examination Management---------------------------

export const GetAircraftAta = async ({ queryKey }: any) => {
  const [, AircraftType] = queryKey;
  return axiosInstance.get(
    `/Examination/GetAircraftAta?AircraftType=${AircraftType}`
  );
};

export const getRegisteredAta = async () => {
  return axiosInstance.get(`/Examination/GetRegisteredAta`);
};















// GET TOTAL USERS
export const fetchTotalUsers = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalusers')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL PRODUCTS
export const fetchTotalProducts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalproducts')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL RATIO
export const fetchTotalRatio = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalratio')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL REVENUE
export const fetchTotalRevenue = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalrevenue')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL SOURCE
export const fetchTotalSource = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalsource')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL VISIT
export const fetchTotalVisit = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalvisit')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL REVENUE BY PRODUCTS
export const fetchTotalRevenueByProducts = async () => {
  const response = await axios
    .get(
      'https://react-admin-ui-v1-api.vercel.app/totalrevenue-by-product'
    )
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL PROFIT
export const fetchTotalProfit = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalprofit')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL USERS
export const fetchUsers = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/users')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE USER
export const fetchSingleUser = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/users/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL PRODUCTS
export const fetchProducts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/products')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE PRODUCT
export const fetchSingleProduct = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/products/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL ORDERS
export const fetchOrders = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/orders')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL POSTS
export const fetchPosts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/posts')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL NOTES
export const fetchNotes = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/notes?q=`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL LOGS
export const fetchLogs = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/logs`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};
