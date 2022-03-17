/*
  CertificateService에서 매개변수로 넘어온 입력값에 맞게 DB(CertificateModel)에 새로운 데이터를 저장하거나, 찾거나, 갱신하거나, 삭제하여 CertificateService로 return
  천준석
  2022/03/17
*/

import {CertificateModel} from "../schemas/certificate";

class Certificate {
  // db 모델에 넘어온 정보들을 create 저장하고 그 내용을 return
  static async create({newCertificate}) {
    const createdNewCertificate = await CertificateModel.create(newCertificate)

    return createdNewCertificate;

  }
}


export {Certificate};