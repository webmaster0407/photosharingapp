import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';

import { getAllCategories } from '../../../services/CategoryServices';
import CategoryEditModal from '../../../components/CategoryModal';
import useUserRole from '../../../hooks/useUserRole';
import { useUserContext } from '../../../contexts/UserContext';

function CategorySelector() {

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useUserContext();
  const [role] = useUserRole(user);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(data => setCategories(data.allCategories));
  }, [openEdit, role])

  return (
    <>
      <Box mt={4}>
        {
          categories.map((category, index) => {
            return <Button
              onClick={() => navigate(`/?category=${category._id}`)}
              key={index}
              sx={{
                display: category.status ? 'inline' : 'none',
                color: 'black',
                borderRadius: '25px',
                backgroundColor: 'whitesmoke',
                m: 1,
              }}
              variant='error' >
              {category.name}
            </Button>
          })
        }
        {
          role === "admin" &&
          <>
            <Button onClick={() => setOpenCreate(true)} sx={{ borderRadius: '25px', m: 1 }} variant='contained' color='error' ><Add /></Button>
            <Button onClick={() => setOpenEdit(true)} sx={{ borderRadius: '25px', m: 1 }} variant='outlined' color='error' ><Edit /></Button>
          </>
        }
      </Box>
 
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CategoryEditModal categories={categories} isEdit={true} setOpen={setOpenEdit} />
      </Modal>

      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CategoryEditModal isEdit={false} setOpen={setOpenCreate} />
      </Modal>
    </>
  )
}

export default CategorySelector;