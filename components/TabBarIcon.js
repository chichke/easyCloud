import { Feather } from '@expo/vector-icons';
import React from 'react';

export const showLoginIcon = ({ color, size }) => (
  <Feather name="log-in" color={color} size={size} />
);

export const showSignupIcon = ({ color, size }) => (
  <Feather name="user-plus" color={color} size={size} />
);

export const showHomeIcon = ({ color, size }) => <Feather name="home" color={color} size={size} />;

export const showProfileIcon = ({ color, size }) => (
  <Feather name="user" color={color} size={size} />
);
