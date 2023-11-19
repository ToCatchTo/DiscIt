import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseAdminConfig = {
        "type": "service_account",
    "project_id": "discit-6f051",
    "private_key_id": "aa794ae4c137a4d52db34974007fd980ddd8526e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCld2+XEHocOS/9\nMRnnlSxFEgf7M7jN7y56I54V6ppgDYuhS5MgS6Iygf+r/4qf++KB4x3dD1gWs0vg\nSbh9dLeKjIc2F58pkGZVnR3/mlKW+4K4EZwN8j24Vh+7WekV+qSxW/mb6O984eWk\nZyJRLOngcvxRsKX+JmWYgPoFCLy72hc4RYVYgvRaDhPJktJNMwYHsyL3V6Fw2nth\nfNwKPujoNC1C2kJG5d6v4VH8aHCz/RhNpg8wnVZYBsr8JVeVDnAFnxT8tn3cD2x6\nq3qaCiUpeV9Jn9txBfPDULFKOoAf7O8olOxCVDbNEPLMSuhXaBjR2qWz/FRT24Qp\nddHa8m3xAgMBAAECggEARQyIzCTrmCCDNqjJUxssjKxAGWNVkNZpcj2vyByNDF1K\nseX8QQNe7a3TGB785dMyjBpPSYMQMvTiSnfpHa1ZtF79Q6Tq3ejs03hL3vCy21+c\nhpyOn0FB4U1LU57rBimAlaS4jofPfLE15/vD1dUkye2h/qL1OhAi4FeePgCN5eOq\nMdOLwSF/Kb74XT+I03tqbaApH/qg6jkKG/v9XPtfWBzSMFSfu4HUX39IV+eRDieX\nZlrdFM+EXBTjmcMmqM26nq6rlcmoBxs9V9oIrvMQwQW30e5AYLLO5Lz8oqWIj2Kk\naTJmfWL+GsOBcS8SMs62GYKXtcxPvpXEjixYNsrywwKBgQDaFvJZ0aD8UGvbi01F\nxg1+tetszWJ4xaa5zhE+zurYmG9VknzMhK6/ltGDfFMKjxigtsG1psE3iicS9QMX\nGKdiCGCFCfXumFjejukwyu/KbXUFbQdqYB1ATeO2PI0ZlSMgWDOFBpcWz6rKcGxJ\n2S1B/93/tBhC0cgcJl0nAu9ijwKBgQDCOr8F1aQUAUhgA7/xjEm7VhScmnJu/fqZ\n/nyWJC1gs3okQyuIyaNC+Wg/ZcHwkni9TuDCsv/ABZwQH9H3XGPgnnNxXgvmjz8W\n5QU532SRik/pZ/E4TuOMDyqSmev+TEQ+Fe1hfOc158n365ydD+HuthXt9LuXrhqC\nfUD/smdnfwKBgQCZcfG8jokFXhQ1WVLaF9pg3+CwIeX58Z84NiveFDoagU48WCAk\nyeol9Rieube3wyzhzxSGGbjyuep6JReyhW8nw5sdn/+Ai4JjvQuHgBGtTMw8MBU6\nnDuYhfUEwJ/KcytO06AUJaniq+SQIP+gCgUU3dE122ICiZWRcNCz5RXHMwKBgFDd\n0KaHOpcxqYaASSwycohS4KYLD9XyXKI8+HYyfcojL5lldfyvpw+9c4/huAuHkEmR\nS7cEe8LhEwcLmInap6LflcT/mQjXXzcTB0f/IIoQAhF1u1LsVYT804bSGxV3f3ox\n+vF55XHmHYrhSAWElVaj7SFzoZ8XV+Y4bBWJm8/VAoGBAKSMkIjdTRx4GqhEPoEY\nsrZEA2hnWoP+6sdD7AXw1h7+kzUaWaM59mgnI/4GRCWp+bErtFbg1i3ROEz5OjA2\nP914F0Td2TEyC/wwGimrmMpmMA7bYNhpW1F3u20mpNER1ULEic/M7nBCWjpLkwIN\nQCaEhfqP5BmvbUNXizGG+YQT\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-b23is@discit-6f051.iam.gserviceaccount.com",
    "client_id": "104217527362049451272",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b23is%40discit-6f051.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

if (admin.apps.length === 0) {
    // Initialize Firebase
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(JSON.stringify(firebaseAdminConfig))),
    });
}

export const adminAuth = admin.auth;