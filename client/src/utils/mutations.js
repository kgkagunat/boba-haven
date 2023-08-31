// utils/mutations.js
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            id
            email
        }
    }
}`;

export const SIGNUP_USER = gql`
mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
        token
        user {
            id
            email
        }
    }
}`;
