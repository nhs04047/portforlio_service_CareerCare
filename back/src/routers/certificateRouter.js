/*
  클라이언트로부터 넘어온 정보들로 certificateService에 넘겨주고, 해당 작업에 맞는 return을 certificateService에 받아서 클라이언트로 보내준다.
  천준석
  2022/03/17
*/
import {Router} from "express";
import {CertificateService} from "../services/certificateService";
import { login_required } from "../middlewares/login_required";

const certificateRouter = Router();
certificateRouter.use(login_required);

// 클라이언트로 넘어온 정보들로 바탕으로 db에 저장하고 반환값을 클라이언트에게 돌려준다.
certificateRouter.post("/certificate/create", async function(req,res,next) {
  try {
    // id, title, description, when_date 클라이언트에게 받는다.
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    // db로 가기 전 각 자격증을 구별하기 위해서 CertificateService로 넘겨준다.
    const newCertificate = await CertificateService.addCertificate({user_id, title, description, when_date});

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error)
  }
})

export {certificateRouter};