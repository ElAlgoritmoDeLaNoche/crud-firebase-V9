import React, { useState, useEffect } from 'react'
import { addContactInitiate, getContactsInitiate, getContactInitiate, updateContactInitiate, deleteContactInitiate, reset } from './redux/Actions'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardHeader, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  name: '', //Nombre
  lastname: '', //Apellido
  email: '', //Email,
  company: '', //Compañia
  url: '', //URL
  birthday: '', //Cumpleaños
  relationship: '', //Relación
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 70,
    margin: "auto",
    padding: "15px",
    maxWidth: "500px",
    alignContent: "center",
  }
}))

function App() {

  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const [editMode, setEditMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const { name, lastname, email, company, url, birthday, relationship } = state

  const dispatch = useDispatch()
  const { contacts, contact: singleContact } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getContactsInitiate())
  }, [])

  useEffect(() => {
    if (singleContact) {
      setState({ ...singleContact })
    }
  }, [singleContact])

  const handleModal = (id) => {
    setModalOpen(true)
    dispatch(getContactInitiate(id))
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    dispatch(reset())
  }

  const modalBody = (
    <div className="row">
      <div className="col-sm-4">Fullname:</div>
      <div className="col-sm-8">{singleContact.name} {singleContact.lastname}</div>
    </div>
  )

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContactInitiate(id))
    }
  }

  const editContact = (id) => {
    setEditMode(true)
    setUserId(id)
    dispatch(getContactInitiate(id))
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !lastname || !email || !company || !url || !birthday || !relationship) {
      setErrorMsg('Please fill all required inputs')
    } else {
      if (!editMode) {
        dispatch(addContactInitiate(state))
        setState({ name: "", lastname: "", email: "", company: "", url: "", birthday: "", relationship: "" })
        setErrorMsg('')
      } else {
        dispatch(updateContactInitiate(userId, state))
        setUserId(null)
        setEditMode(false)
        setState({ name: "", lastname: "", email: "", company: "", url: "", birthday: "", relationship: "" })
        setErrorMsg('')
      }
    }
  }

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md='6'>
          <form onSubmit={handleSubmit} className={classes.root}>
            <MDBTypography
              className="text-start"
              variant='h4'
            >
              {!editMode ? 'Add Contact' : 'Update Contact'}
            </MDBTypography>
            {errorMsg && <h4 style={{ color: '#dd4b39' }}>{errorMsg}</h4>}
            <MDBInput
              label="Name"
              value={name || ''}
              name="name"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBInput
              label="Lastname"
              value={lastname || ''}
              name="lastname"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBInput
              label="Email"
              value={email || ''}
              name="email"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBInput
              label="Company"
              value={company || ''}
              name="company"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBInput
              label="URL"
              value={url || ''}
              name="url"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBInput
              label="Birthday"
              value={birthday || ''}
              name="birthday"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBInput
              label="Relationship"
              value={relationship || ''}
              name="relationship"
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <MDBBtn
              style={{ width: '100%' }}
              color={!editMode ? 'success' : 'warning'}
              type="submit"
            >
              {!editMode ? "Submit" : "Edit"}
            </MDBBtn>
          </form>
        </MDBCol>
        <MDBCol md='6'>
          {contacts && contacts.map((item, i) => (
            <MDBCard key={i} background='danger' className='text-white mb-3' style={{ maxWidth: '100%', marginTop: '90px' }}>
              <MDBCardHeader><b>Fullname:</b> {item.name} - {item.lastname}</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle><b>Company:</b> {item.company}</MDBCardTitle>
                <MDBCardText><b>Email:</b> {item.email}</MDBCardText>
                <div className="buttons">
                  <MDBBtn
                    onClick={() => handleModal(item.id)}
                  >
                    <MDBIcon fas icon="eye" size="lg" style={{ marginRight: '5px' }} />
                    View
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => editContact(item.id)}
                  >
                    <MDBIcon fas icon="pen" size="lg" style={{ marginRight: '5px' }} />
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => deleteContact(item.id)}
                  >
                    <MDBIcon fas icon="trash" size="lg" style={{ marginRight: '5px' }} />
                    Delete
                  </MDBBtn>
                </div>
                <br />
                <MDBBtn style={{ width: '100%' }}>PDF</MDBBtn>
              </MDBCardBody>
              {modalOpen && (
                <MDBModal show={modalOpen} tabIndex='-1'>
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle style={{ color: '#333333' }}>Contact Info</MDBModalTitle>
                        <MDBBtn
                          className='btn-close'
                          color='none' onClick={handleCloseModal}
                        ></MDBBtn>
                      </MDBModalHeader>
                        <MDBModalBody style={{ color: '#333333' }}>
                          {modalBody}
                        </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn
                          color='secondary'
                          onClick={handleCloseModal}
                        >
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              )}
            </MDBCard>

          ))}

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
