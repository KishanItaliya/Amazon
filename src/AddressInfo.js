import React, {useState, useEffect} from 'react';
import './AddressInfo.css';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {useHistory} from 'react-router-dom'
import { getBasketTotal } from './reducer';
import { auth } from './firebase'

function AddressInfo() {
  const history = useHistory();
  const [{user, basket}, dispatch] = useStateValue();

  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: null,
    email_id: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    country: null,
    zip: null,
    phone: null
  })

  const { name, email_id, address1, address2, city, state, country, zip, phone } = values

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(!authUser){
        history.push('/login')
      }
    })
    if(basket?.length <=0 ){
      history.push('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_USER_INFO",
      userInfo: {
        name: name,
        email_id: email_id,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        country: country,
        zip: zip,
        phone: phone
      }
    })
    if((name && email_id && address1 && city && state && country && zip && phone) != null){
      history.push('/payment');
    }
    else{
      alert('Enter Required Fields');
    }
    
  }

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
    setError(event.error ? event.error.message : "")
  }


  return (
    <div className="addressInfo">
      <div className="addressInfo__section">
          <div className="addressInfo__title">
              <h3><span><LocalShippingIcon fontSize='large'/></span>Shipping Details</h3>
          </div>
          <div className="addressInfo__address">
            <form>
              <div className="billingDetails">
                  <div className="billingDetails__InputText">
                      <label for="name">Name</label>
                      <input name="name" type="text" placeholder="Enter your Name..." className="billingDetails__Input" onChange={handleChange("name")} value={name} required />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="email_id">Email</label>
                      <input name="email_id" type="email" placeholder="Enter your Email..." value={email_id} className="billingDetails__Input" onChange={handleChange("email_id")} required />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="address1">Address Line1</label>
                      <input name="address1" type="text" placeholder="Enter your Address..." className="billingDetails__Input" onChange={handleChange("address1")} value={address1} required />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="address2">Address Line2</label>
                      <input name="address2" type="text" placeholder="Enter your Address..." className="billingDetails__Input" onChange={handleChange("address2")} value={address2} />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="phone">Mobile</label>
                      <input name="phone" type="text" placeholder="Enter your Mobile No..." className="billingDetails__Input" onChange={handleChange("phone")} value={phone} required />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="city">City</label>
                      <input name="city" type="text" placeholder="Enter City Here..." className="billingDetails__Input" onChange={handleChange("city")} value={city} required />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="state">State</label>
                      <input name="state" type="text" placeholder="Enter State Here..." className="billingDetails__Input" onChange={handleChange("state")} value={state} required />
                  </div>

                  <div className="billingDetails__InputText">
                      <label for="country">Country</label>
                      <input name="country" type="text" placeholder="Enter Country Here..." className="billingDetails__Input" onChange={handleChange("country")} value={country} required />
                  </div> 

                  <div className="billingDetails__InputText">
                      <label for="zip">Zip</label>
                      <input name="zip" type="text" placeholder="Enter Zip Code..." className="billingDetails__Input" onChange={handleChange("zip")} value={zip} required />
                  </div>
    
                  <button onClick={handleSubmit} className="addressInfo__button">
                    <span>Continue to Checkout</span>
                  </button>
                  
                  {error && <div>{error}</div>}
              </div>
            </form>
          </div>
      </div>
                
    </div>
  )
}

export default AddressInfo



