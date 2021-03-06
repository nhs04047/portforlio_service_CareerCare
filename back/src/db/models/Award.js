/*
 * 수상 모델, 수상 서비스(awardService.js)에서의 필요한 데이터 처리 관련 코드 작성
 *
 * <award CRUD 구현>
 * 작성자 : 천준석
 * 작성일 : 2022.03.16
 * awardService에서 매개변수로 넘어온 입력값에 맞게 DB(AwardModel)에 새로운 데이터를 저장하거나, 찾거나, 갱신하거나, 삭제하여 awardService로 return
 *
 * <award 비공개 설정 구현>
 * 작성자 : 장정민
 * 작성일 : 2022-03-23
 * findManyByAnotherUserId() : 현재 로그인한 유저아이디와 열람하려는 페이지의 유저아이디가 다른 경우 호출하는 함수
 */

import { AwardModel } from '../schemas/award';

class Award {
  /*
   * create()
   * 새로운 수상이력에 대한 정보를 DB에 만들고 return
   */
  static async create({ newAward }) {
    return AwardModel.create(newAward);
  }

  /*
   * findOneById()
   * DB에 awardId와 같은 award document 하나의 객체를 return
   */
  static async findOneById({ awardId }) {
    return AwardModel.findOne({ id: awardId });
  }

  /*
   * update()
   * DB에 awardId와 같은 award document 하나의 객체를 넘어온 파라미터에 맞게 수정하여 return
   */
  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  /*
   * findManyByUserId()
   * AwardModel.find을 사용하여 db에서 해당 user_id에 알맞는 award 목록을 획득.
   */
  static async findManyByUserId({ user_id }) {
    return AwardModel.find({ user_id });
  }

  /*
   * findManyByAnotherUserId()
   *매개변수로 보낸 user_id(네트워크 페이지에서 접근가능한 다른 유저의 Id)의 project 컬렉션 documents를 return하는 함수
   */
  static async findManyByAnotherUserId({ user_id }) {
    //AwardModel에서 isPrivate : "true" 인, 즉 비공개인 데이터는 리턴하지 않는다.
    return AwardModel.find({ user_id: user_id, isPrivate: false });
  }

  /*
   * deleteOneById()
   * AwardModel.deleteOne을 사용하여 db에서 해당 awardId에 알맞는 데이터 삭제
   */
  static async deleteOneById({ awardId }) {
    const deleteResult = await AwardModel.deleteOne({ id: awardId });
    // deleteResult의 반환 값이 deletedCount가 있는데, deletedCount 값이 1이면 삭제되었다는 의미이므로 true를 반환한다.
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Award };
