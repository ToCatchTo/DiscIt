import * as admin from 'firebase-admin';
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
    // type: "service_account",
    //     project_id: "muzis-11dec",
    //     private_key_id: "8ef93d1e4b30c79406c61f36388cd2182a9c74fe",
    //     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEI363Ypq1Enzk\nHMg/RE8LVzxqX9Og3FLo05CHbJdHjO7T9eGcVbr2huSU7ipPZ2eiID8n+/YojUkq\nbJOa2jAFnZ+gSDmBxSJUO4ugRcfBCd7gL1dNiqy1DGDb85od2xILvUD9z4QRtReM\n8o6fBlN6SKCurhVurOn2u3z/BVDeE5CnPIIZQZmfX3LtZbh7AlUckac7/X78YSqp\nazcRXpbAQ+FAzrRpb2f+csGOsxX1wmvDdGAyZdnTU2bhHDK7lKil9UVL6AFjdLF6\n++V+p8XVzlNqaE9PqjDGmwhEp5qRonyva1AqwhdpJcpnJY0qkJcyrJq0QMWspuvz\nET/B09jBAgMBAAECggEAHONPdAoZWCb/bweQNMVGURjJpK81d8FLktAqPs/vHhIz\nUNOrpX94+HtYqljDsYs818OhGa4CDOn2R0HToaCWJxWWn6BTm/nhev+EKphsedGO\n2n0OgjS1CDto/qxL3C7aYxE+Q8OvI36FF/TXrbNcUyvkQqYQMQtVsEnf+J2bUgHU\nWTyLNbHMJysR1w8HVNMQlBRqRZ32YwLi/KmUZs5Z3c9866vXwhfYLmxxTTuSID9N\nAoh1WL09XD5+wub9rgmq60nnjTlGT/QL8h9QNCf4voVI6SW2gv61TLKQAzl1J2hk\n1BcpwDNuD4M1A2/F9gEYQ9mZBGmQhXX8DopBdnsqewKBgQD39tP67MnWopLwGWxl\n2Iu0LYqYLgoM+Wo/RDBbS4EUV5erEH+rQySYMDzraiNvLuBVm9NP6rirQg1z+8mD\nHUiAy3keWeOB5emj5DL1yv+EEjEtKrZHTsMeduS8TCE7resfCtJCOUFXwjSdvgLm\na+tU3HpUCB9kN5TkmdfEpsGhCwKBgQDKfrWq58AGHVknrtxCDJsPBWl4ouB+3Kxe\nBUXc/vWqgVrdHJHVE3jwVybEKBC8aPw65EPbRXJGVM7JeMNmlx06D8xRZzHZWlbm\nppkivlPavbZHzOt5D0jm6Ual/ahZHILVXKvjl4lqDhqnUcP4y5YsqCAV867+oxXV\nhum680Wk4wKBgQCH1YnoMmCbGHH/3x13aTmWmUAL/2R4GQVv5O3MhT8PorAuAJq/\neceJKxukJn+Ev5waqYMHi2BgSI3QFIUeMyNtkokl7D3qAcWMh0y3Qt3YPpL72CME\nSwwuGxlQYS/vXmWnmqj1qCG4bmWeZ+F00neXBDRq5gw0PRJubCw7yNHXYwKBgAM4\n/wUoSQsP3oJeKw02DCWyDVqpJO9/7ZJVfSYmPJypEFwif0On2q3ghTJr/NAyz4jU\nZywPL+FkqiHUtS9lykZJSBQnk0iFQorLLfa6lrUNfeAop7q2fo+GOOSdY9d/N6nT\nnryxhbNVZCEzkO3dt5cgWdpflXJiAA/05LVf98THAoGAOVB3eHNLyumW7x7YlVKl\nT9GJNI+DKif+eZGqVn7/eAd84mRI1e5RJa+mOEzjWUgS16E4UwzHx+ekh9cORoSu\nRwsrk09LCIJzDMrPV0SPD45Flrs4pXTPZQyeG5rgo95cayKoDc71gTipYKIRNGrs\nWLGjbdiSSC5TSvsVCAdh7+o=\n-----END PRIVATE KEY-----\n",
    //     client_email: "firebase-adminsdk-8zwl6@muzis-11dec.iam.gserviceaccount.com",
    //     client_id: "104946486758294048537",
    //     auth_uri: "https://accounts.google.com/o/oauth2/auth",
    //     token_uri: "https://oauth2.googleapis.com/token",
    //     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    //     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8zwl6%40muzis-11dec.iam.gserviceaccount.com"
}
if (admin.apps.length === 0) {
    // Initialize Firebase
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(JSON.stringify(firebaseAdminConfig))),
    });
}
export const adminAuth = admin.auth;