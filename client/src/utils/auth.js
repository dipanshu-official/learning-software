

export const getUserSession = () => {
  try {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error reading user session:', error);
    return null;
  }
};

export const setUserSession = (session) => {
  try {
    localStorage.setItem('userSession', JSON.stringify(session));
  } catch (error) {
    console.error('Error setting user session:', error);
  }
};

export const clearUserSession = () => {
  try {
    localStorage.removeItem('userSession');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

export const isAuthenticated = () => {
  const session = getUserSession();
  return session !== null;
};

export const hasRole = (requiredRole) => {
  const session = getUserSession();
  if (!session) return false;
  
  // Admin has access to everything
  if (session.role === 'Admin') return true;
  
  // Check specific role
  return session.role === requiredRole;
};

export const getSessionDuration = () => {
  const session = getUserSession();
  if (!session) return 0;
  
  const loginTime = new Date(session.loginTime);
  const currentTime = new Date();
  return currentTime.getTime() - loginTime.getTime();
};

export const isSessionExpired = () => {
  const session = getUserSession();
  if (!session) return true;
  
  // If "Remember Me" is checked, session lasts 30 days
  // Otherwise, session lasts 8 hours
  const maxDuration = session.rememberMe 
    ? 30 * 24 * 60 * 60 * 1000 // 30 days
    : 8 * 60 * 60 * 1000; // 8 hours
  
  return getSessionDuration() > maxDuration;
};

export const refreshSession = () => {
  const session = getUserSession();
  if (session) {
    setUserSession({
      ...session,
      loginTime: new Date().toISOString()
    });
  }
};



export const validateCredentials = (email, password) => {
  return Object.values(demoCredentials).find(
    cred => cred.email === email && cred.password === password
  );
};