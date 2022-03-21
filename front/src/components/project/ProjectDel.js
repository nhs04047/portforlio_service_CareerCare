import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Api from '../../api';

function ProjectDel({ project, portfolioOwnerId, setProject }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = async (e) => {
    e.preventDefault();
    // console.log(portfolioOwnerId);
    // const user_id = portfolioOwnerId;
    const user_id = project.user_id;
    console.log(user_id);

    await Api.del(`projects/${project.id}`);

    const res = await Api.get('projectlist', user_id);
    const updatedProject = res.data;

    setProject(updatedProject);
    setShow(false);
  };

  return (
    <>
      <Button variant='outline-info' size='sm' onClick={handleShow}>
        삭제
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>프로젝트 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectDel;
