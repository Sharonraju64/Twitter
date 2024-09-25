const admin = require('firebase-admin');

let serviceAccount;
try {
   serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)
} catch (error) {
    console.log("Error:", error);
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const updatePassword = async(email, newPassword) =>{
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const uid = userRecord.uid;
        await admin.auth().updateUser(uid, {
            password: newPassword,
        });
        console.log("password updated Successfully!");        
    } catch (error) {
        console.log('Error updating password:', error);
        
    }  
};

module.exports = updatePassword;