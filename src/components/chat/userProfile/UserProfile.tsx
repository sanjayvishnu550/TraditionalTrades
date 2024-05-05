import React, { Component } from "react";
import "./userProfile.css";

export default class UserProfile extends Component {
  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  render() {
    return (
      <div className="w-3/2 p-4 main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img
              alt=""
              src="https://firebasestorage.googleapis.com/v0/b/traditional-images.appspot.com/o/blank-profile-picture.webp?alt=media&token=f10ddca2-75f5-4915-90ae-de093bb8bfdb"
            />
          </div>
          <h4>id:Seller@12</h4>
          <p></p>
        </div>
        <div className="profile__card">
          <div className="card__header" onClick={this.toggleInfo}>
            <h4>Information</h4>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="card__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ultrices urna a imperdiet egestas. Donec in magna quis ligula
          </div>
        </div>
      </div>
    );
  }
}
