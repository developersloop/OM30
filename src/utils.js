import axios from "axios"

export const validate = (value, name) => {
    /* eslint-disable no-useless-escape */
    const regex = name == 'email' 
        ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    return regex.test(value)
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

export const generateToken = (str, algo = "SHA-256") => {
    let strBuf = new TextEncoder().encode(str);
    return crypto.subtle.digest(algo, strBuf)
      .then(hash => {
        window.hash = hash;
        // here hash is an arrayBuffer, 
        // so we'll connvert it to its hex version
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
      });

}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
          reject(error);
      };
  });
};

export const uploadImage = async (event) => {
  const file = event.target.files[0];
  const base64 = await convertBase64(file);
  return new Promise((resolve,reject) => {
    if(base64) resolve(base64)
    else reject(base64)
  })
};

export const viaCep = (cep) => {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}
