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

export const validCpf = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export const validaCns = (cns) => {
  if (cns.trim().length != 15) return false;
  
  let soma
  let resto
  let dv
  let pis = ''
  let resultado = ''

  pis = cns.substring(0,11);
  
  soma = (parseInt(pis.substring(0,1)) * 15) +
    (parseInt(pis.substring(1,2)) * 14) +
    (parseInt(pis.substring(2,3)) * 13) +
    (parseInt(pis.substring(3,4)) * 12) +
    (parseInt(pis.substring(4,5)) * 11) +
    (parseInt(pis.substring(5,6)) * 10) +
    (parseInt(pis.substring(6,7)) * 9) +
    (parseInt(pis.substring(7,8)) * 8) +
    (parseInt(pis.substring(8,9)) * 7) +
    (parseInt(pis.substring(9,10)) * 6) +
    (parseInt(pis.substring(10,11)) *5)
  
  resto = soma % 11;
  dv = 11 - resto;
  
  if (dv == 11) dv = 0;
  
  if (dv == 10){
    soma = (parseInt(pis.substring(0,1)) * 15) +
      (parseInt(pis.substring(1,2)) * 14) +
      (parseInt(pis.substring(2,3)) * 13) +
      (parseInt(pis.substring(3,4)) * 12) +
      (parseInt(pis.substring(4,5)) * 11) +
      (parseInt(pis.substring(5,6)) * 10) +
      (parseInt(pis.substring(6,7)) * 9) +
      (parseInt(pis.substring(7,8)) * 8) +
      (parseInt(pis.substring(8,9)) * 7) +
      (parseInt(pis.substring(9,10)) * 6) +
      (parseInt(pis.substring(10,11)) *5)
    resto = soma % 11;
    dv = 11 - resto;
    resultado = pis + "001" + dv;
  }

  else resultado = pis + "000" + dv;
  
  if (cns !== resultado) return false
  else return true
  
}
  
  

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

export const defaultAvatar = () => {
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDQ0NDQ8NDQ0OEA0NDQ0NDQ8ODQ4QFREWFhcRFhMYHSggGBolGxMVITEhJSkrLi4uFx8zODMsNygtLjcBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQQFAwIH/8QALxABAAECBAQFAwMFAAAAAAAAAAECAwQRITESQVFxIjJhgdFCkaGCscEFFDNikv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEUAAAAAAAAAEBR5VX6I+qPbV8Ti6PX7A0DP8A3dHr9n3TiKJ+qPfQHqJE9NeygAAAAAAAAAAAACKAAAAAAA+a64pjOZyh5378U6b1dPlgrrmqc5nOQaLmMnamMvWd/szVVzO8zPdAAAAAFpqmNpmOzRbxkx5vFHXaWYB1LdyKozifmH25NNUxOcTlLdh8TFWk6VfiQaAAAAAAAAAAAAAAAAHjib3DGnmnb5eldcUxMztDl3K5qmZnmCTOes6yAAAAAAAAAAADdhb/ABeGfNH5aXIicpiY3h07Nzipifv6SD0AAAAABFRQAAAAASZBjx1zWKY5az3ZVrqzmZ6zmgAAAAAAAAAAAAD3wdzKrLlVp7vAB1x826s4iesZvoAAAAEVFAAAAAeWJqyoq7Zfd6s+Nnwe8A56gAAAAAAAAAAAAAADfgqs6O0zDQyf0+dKu8NYAAAAIqKAAAAAz47ye8NDxxUZ0VfcHOEUAAAAAAAAAAAAAAGz+n7Vd4a2bAx4M+sy0gAAAAigAAAAAkxnEx10UByKoymYnlOQ0Y23lVxcp37s4AAAAAAAAAAAAAPXC2+KuOkayDfapypiOkPsAAAAARQAAAAAAB8XbcVUzE+3pLmVUzEzE7w6zNirHF4o80fmAYQAAAAAAAAAAAHSw9rhpy5zrLxwlj66v0x/LWAAAAAACKigAAAAAAAAzYnDcXip0q59JYZjLSdJdK5fpp3nOekayx37/F9MR68weIAAAAAAADZh8L9VftT8s9i7wznlE+vNtt4mmrnlPSQewAAAAAAAIqKAAAAADLiMVlpTrPOeUA9rt6mnfflEbsV3E1Vf6x0j5eMznrOs9QEUAAAAAAAAAAAelq/VTtOcdJbbOIpq9J6S5wDrjFYxXKv/AK+WwFAAAAEUAAAGLF3/AKKf1T/AJicTn4aduc9WYABAFEAUQBQAAAAAAAAAHvhsRw6TrT+zwAdaJz1jZXPwt/hnhnyz+HQAAAEUAEqqyiZnaAeOKvcMZR5p/Hq576uVzVM1Tz/EPkAAEAAAAAAAAAAAAAAAAABW3B3s44Z3jb1hiKZymJjeNQdcfFqvipiY5/u+wAAGTHXNqY56y1uVdr4qpnrOnYHyAAACAAAAAAAQAAAAAEgAAAQAoANOCuZTNPXWO7c5FM5TExvGrq01ZxExz1B9AA+bnlntLkwoAAAACAAAAAAAAAAAAAAAAAAoADpYX/HT2AHqAD//2Q=="

}
