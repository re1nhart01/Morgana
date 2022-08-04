import {BaseModelType} from "./base.interface";

export interface UserModelType extends BaseModelType {
       username:     string;
       password:     string;
       email:        string;
       icon:         string;
       about:        string;
       color:        string;
       theme:        boolean;
       inviteHash:   string;
       birth:        number;
       rtcID:        string;
       isActive:     boolean;
       rtcid:        string;    //@from table Users
       isactive:     boolean;   //@from table Users
}