import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/e898047d-5e01-41d4-9ece-5d25b5e6864d/360_0/1_c8f58f3d-f370-4411-b4f5-83cc5113e4cd_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e898047d-5e01-41d4-9ece-5d25b5e6864d/tl-PH-0e0006dc-8aa9-4f0d-9330-aefe9afffdff/tl-PH-2040e1f3-6b26-4bae-b0f9-b450152ab497.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/816bc979-2f26-4dfa-9e0c-e63400b15237/360_0/2_bbce60a3-4fc5-469b-bc67-2273d0e4a9e6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/816bc979-2f26-4dfa-9e0c-e63400b15237/tl-PH-e17ee626-e987-476f-abf8-ed71c990a7ac/tl-PH-2a290138-49a7-406b-8a37-3fb3e05a1262.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/422e7d00-fcce-4f08-863e-1f0b32f86ab7/360_0/3_a04e67a9-8fa8-4ce5-a778-1a3d1bb73dc4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/422e7d00-fcce-4f08-863e-1f0b32f86ab7/tl-PH-d05c09d0-8338-463a-9e14-61c447d1a932/tl-PH-03e92f51-ae11-4b03-95d2-36137587a55a.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/0a9bc299-8d42-4f6a-8916-ac05607cbe30/360_0/4_041880c3-6249-4a29-b1f2-86a1f4d5e7e2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0a9bc299-8d42-4f6a-8916-ac05607cbe30/tl-PH-b8b86fdd-0afe-4eda-a9f4-2fd2dfd5b99a/tl-PH-453dbe4a-b7ab-4d5d-976f-4f136def268f.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/a2291d56-257d-4328-b429-e6eb011f7797/360_0/5_2b7a7f1e-5073-466f-ac0e-8dbf715be59a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a2291d56-257d-4328-b429-e6eb011f7797/tl-PH-e0cf2770-4107-47ac-b3be-b5d80244193b/tl-PH-26e9fc9a-6aaf-40f8-addf-aad55ac6220b.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/b00bbb1f-70a1-4174-86d9-c97b6d3961ce/360_0/6_d4689c07-ec42-4e5c-9876-a9780ed29fc5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b00bbb1f-70a1-4174-86d9-c97b6d3961ce/tl-PH-2f087d50-ed86-4561-96e2-a77746a8ec2d/tl-PH-82134935-ba3d-4b9d-a22f-ced8585f5261.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/6e3b03a7-fd6d-4ca9-ad87-bfc4b455588d/360_0/7_c691d78a-4db8-4044-af47-0befda3ba2b7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6e3b03a7-fd6d-4ca9-ad87-bfc4b455588d/tl-PH-a0756b9f-19e2-4161-b882-02ff45353694/tl-PH-aeb4cfaa-707f-4f13-9cb6-0de95385f492.m3u8"
},

ep8: {
  video: "https://video-v81.mydramawave.com/vt/805409e2-e1e2-40e9-a6ae-9668565fba0a/360_0/8_1568eed1-e31b-4631-a437-1d25c14ac063_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/805409e2-e1e2-40e9-a6ae-9668565fba0a/tl-PH-f9c14269-206e-492e-a134-ac5fca27b60d/tl-PH-c15e3309-3d8e-404e-b46e-f6fe2c3af97a.m3u8"
},

ep9: {
  video: "https://video-v81.mydramawave.com/vt/ea52c951-10e1-444a-a53e-bfb3bbc7b8d9/360_0/9_5e1f0c92-6151-4e36-aac6-c176ef845743_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ea52c951-10e1-444a-a53e-bfb3bbc7b8d9/tl-PH-cff7e0a7-daf2-4db8-8ef6-0396aac230bb/tl-PH-75a6afc2-f6c7-4b04-9e5a-1d083a0fb17f.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/be285568-2c4a-4964-95e3-cf32531679f4/360_0/10_02998cd7-137c-4f06-86ac-e899888e3148_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/be285568-2c4a-4964-95e3-cf32531679f4/tl-PH-0761cc54-5205-4b0b-8d88-12a4e81862fd/tl-PH-744b8643-68c1-4857-a943-8552f6e1daf2.m3u8"
},
  ep11: {
  video: "https://video-v6.mydramawave.com/vt/0fff4bc0-995e-4b29-99c8-11716d6215cd/360_0/11_ff128418-f4bf-4ae4-a8da-9e13f3c08b65_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0fff4bc0-995e-4b29-99c8-11716d6215cd/tl-PH-03901ac7-d2fe-441d-9b71-7c060dd0878f/tl-PH-26239152-c95a-4e75-b88e-743e4de68c80.m3u8"
},

ep12: {
  video: "https://video-v81.mydramawave.com/vt/cffe4381-f67f-4665-a404-3cc2adcc28e1/360_0/12_5566fa1b-850f-4e39-8377-cbae4cecc518_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/cffe4381-f67f-4665-a404-3cc2adcc28e1/tl-PH-5629460d-1bb7-4334-886b-c29b46d13033/tl-PH-de182cbf-663b-454a-90ab-53b612c4a150.m3u8"
},

ep13: {
  video: "https://video-v6.mydramawave.com/vt/6dbdeef5-06d8-4084-955b-9e78a981e898/360_0/13_591d49bf-9a0d-4e8b-9104-8abb2530d8c5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/6dbdeef5-06d8-4084-955b-9e78a981e898/tl-PH-13c0e613-caaf-4be3-b6ce-9a193be65f09/tl-PH-f73f28d7-9ecd-4dca-88c0-ecc01c2772f5.m3u8"
},

ep14: {
  video: "https://video-v81.mydramawave.com/vt/9f331cc6-4666-4497-8a64-f054614ba07e/360_0/14_71e69f64-a82a-48ed-a9fa-cc204b975868_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9f331cc6-4666-4497-8a64-f054614ba07e/tl-PH-09b5a0a9-40cb-4b85-a679-d238d6d01f5b/tl-PH-eef8c5d2-c449-4e9a-8215-26b14cd1a604.m3u8"
},

ep15: {
  video: "https://video-v6.mydramawave.com/vt/dec86348-599a-4120-8fd8-6f6a3afb50d5/360_0/15_b8b6e6d2-fd00-4399-bb25-78cfec07e9a8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/dec86348-599a-4120-8fd8-6f6a3afb50d5/tl-PH-b6381117-d3de-43ad-960e-21c43e461b4f/tl-PH-e24aa039-6714-4466-89a5-2b0669f0bed7.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/acd772b8-f2bb-4e11-a042-c6cbf17c3eb0/360_0/16_a4bd6878-eccc-4a65-b113-8e969759da03_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/acd772b8-f2bb-4e11-a042-c6cbf17c3eb0/tl-PH-cd92d533-8f92-48c1-b190-9b45acc59555/tl-PH-11d56aad-0bee-4bf0-a9bd-8bebe5a2fcda.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/8fb3ab59-e6fc-48a7-80a2-27c685b2086e/360_0/17_becb88bd-3be7-45d5-b261-873c3b3f5fca_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8fb3ab59-e6fc-48a7-80a2-27c685b2086e/tl-PH-d0e98c9b-1be1-4a7c-bb98-c2907d7c2f3b/tl-PH-2d9ee193-6229-45f1-b5a1-dccbfdc88cee.m3u8"
},

ep18: {
  video: "https://video-v81.mydramawave.com/vt/fcb3efb3-47f0-4be6-a8df-ed88386d709b/360_0/18_6b7db246-33d2-4e61-9105-ce0a0e9108a9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/fcb3efb3-47f0-4be6-a8df-ed88386d709b/tl-PH-e0decf56-e566-4165-a14f-379943cc3011/tl-PH-dcb1bb38-7498-41ad-b6a4-584bda4ed048.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/4a2477cd-fc98-49b2-a235-681d4c851ebb/360_0/19_e8ff4c45-bd87-4d52-974f-e2f5e4b10040_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/4a2477cd-fc98-49b2-a235-681d4c851ebb/tl-PH-793050ae-f71b-436c-8da2-f6013e09752d/tl-PH-0b389858-49ef-4a11-ab12-e08884836284.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/1bfc7392-0d5c-4247-a3fd-fe9899244a28/360_0/20_f14a840a-097d-451a-a60c-677ec9440f9c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1bfc7392-0d5c-4247-a3fd-fe9899244a28/tl-PH-9a83ac48-b0ed-43e2-9b95-40c50d640b76/tl-PH-5f3bfe2f-4af9-43af-8c03-d8ff918eb70f.m3u8"
},
  ep21: {
  video: "https://video-v6.mydramawave.com/vt/4c24c163-a983-4fe9-b912-c060414e7955/360_0/21_7a2055f3-cee1-45da-9a29-d999eee81296_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/4c24c163-a983-4fe9-b912-c060414e7955/tl-PH-f206ec03-45fe-4f1f-903d-955a35cbd864/tl-PH-b137afde-fea5-4ace-b780-4c84a65bda4c.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/2b4d0f8f-a882-49ca-956f-b85cfe511ae5/360_0/22_5e41354a-b15a-44b4-8da1-feb5e7076589_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/2b4d0f8f-a882-49ca-956f-b85cfe511ae5/tl-PH-dff0ae80-c974-4b63-af72-39586c942374/tl-PH-13cd4da5-1a4c-4af0-8fd6-bcda31e529af.m3u8"
},

ep23: {
  video: "https://video-v81.mydramawave.com/vt/48e5cd8d-03bd-441d-ac3e-292c79ef998f/360_0/23_a2b807fc-8d7d-4d47-89ec-f3f58502fc43_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/48e5cd8d-03bd-441d-ac3e-292c79ef998f/tl-PH-34996e8d-bd20-4554-8f6f-1c1d51229ded/tl-PH-3f2e5bb5-d8ca-4a5d-8c37-1ce708dc9480.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/9b542b96-0d91-40e7-aa44-6358e9db83a8/360_0/24_c4423b20-7da0-4583-8169-ee8ccd007ad9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9b542b96-0d91-40e7-aa44-6358e9db83a8/tl-PH-b6ee1970-a762-4a2e-8723-b25454648a51/tl-PH-ccc279a3-03ef-4383-bbf1-79db4d0a452f.m3u8"
},

ep25: {
  video: "https://video-v81.mydramawave.com/vt/cdece4fa-d0ce-42e6-bc0b-bad15d36d1b4/360_0/25_c2c0a698-b1c2-4a2b-baad-44f7f756b5b0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/cdece4fa-d0ce-42e6-bc0b-bad15d36d1b4/tl-PH-b0e69366-db77-4975-8fe8-e8417215d989/tl-PH-f4da2746-080f-4eb4-86fd-a32b1a867c0c.m3u8"
},

ep26: {
  video: "https://video-v81.mydramawave.com/vt/41d698b8-994b-4a9d-a37e-bbeb6b6dc2b0/360_0/26_d523cded-9eb6-4aa1-891a-2bba1d3a33e1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/41d698b8-994b-4a9d-a37e-bbeb6b6dc2b0/tl-PH-2f471ca3-1f8f-4e93-9a0e-90e0e9642a5f/tl-PH-b73ddd22-5bc5-483c-a373-fc1f45d8bca0.m3u8"
},

ep27: {
  video: "https://video-v81.mydramawave.com/vt/f76ab98a-f1a0-4948-9fe1-7cc5661da844/360_0/27_6545df9a-bc4a-4a70-b9e6-b0a1538d0a3a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f76ab98a-f1a0-4948-9fe1-7cc5661da844/tl-PH-a72e52ee-c5a4-458d-92f3-09c3d8594a58/tl-PH-61bfc43b-56de-47f6-a593-b1a47074e959.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/627b0b95-eaac-4c95-84af-c8180c2ff1c8/360_0/28_f3a5b19c-7612-46f9-99a0-1feacc5fc09c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/627b0b95-eaac-4c95-84af-c8180c2ff1c8/tl-PH-5179c0a9-4e87-4500-81cf-60b22c2b4737/tl-PH-416e6cf8-558d-440e-9378-9f559dee30dd.m3u8"
},

ep29: {
  video: "https://video-v6.mydramawave.com/vt/dec84347-9c3a-4222-83cf-0862734ac616/360_0/29_a4806d90-ae8a-4f6e-b1bb-17a1f1f99591_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/dec84347-9c3a-4222-83cf-0862734ac616/tl-PH-9edfbc61-71a0-4bf4-9445-55b8c5a44470/tl-PH-431e52ae-018a-4630-bdb2-871333c612b9.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/0f9ff87f-2abc-4edf-93a5-fca270424300/360_0/30_b9319bb7-23c8-4959-b463-f8b1b9e58db1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0f9ff87f-2abc-4edf-93a5-fca270424300/tl-PH-9f808199-44bf-4b71-8de3-78ae1d697bd8/tl-PH-f4757691-4fda-4818-a8a0-1a59176caae9.m3u8"
},
  ep31: {
  video: "https://video-v6.mydramawave.com/vt/f0d1ed55-6600-46ef-b8a3-7e06f215db66/360_0/31_1127a01c-05aa-483d-8c0e-f36eaf93be85_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f0d1ed55-6600-46ef-b8a3-7e06f215db66/tl-PH-8cf2ed0a-5fc5-4e75-8e85-ddce7fa050ce/tl-PH-29aa6a2d-8796-4418-aa5c-9e5c2f9d9f1e.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/c043ced7-aca8-429a-a34c-a3a1b2b11a9b/360_0/32_e52ee3f6-9097-4634-8d0e-037d80ab7185_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c043ced7-aca8-429a-a34c-a3a1b2b11a9b/tl-PH-960d421a-b42a-49ca-8128-5f3cfd3afc11/tl-PH-1b9a29e6-7bb8-4092-b034-bbfb5c34c190.m3u8"
},

ep33: {
  video: "https://video-v81.mydramawave.com/vt/7b487e87-92ef-4c5a-ba25-a6d62e116fb4/360_0/33_2cacea39-c3a8-4e22-ac11-eff5b966c6e6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7b487e87-92ef-4c5a-ba25-a6d62e116fb4/tl-PH-69a32f5e-ef17-4dd7-9ebf-c22df91b34d5/tl-PH-04675516-0cf9-45e0-8df4-ea37df895379.m3u8"
},

ep34: {
  video: "https://video-v81.mydramawave.com/vt/c067d47f-02e0-4b51-9256-411f081edfa4/360_0/34_cf7bcc8a-7206-4ebb-addc-147586ef492b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c067d47f-02e0-4b51-9256-411f081edfa4/tl-PH-e4a2d36c-59b6-4908-bd1b-64bf52f76043/tl-PH-896023e8-64f2-4a02-8691-64bf7d7218f1.m3u8"
},

ep35: {
  video: "https://video-v81.mydramawave.com/vt/c3da7070-9501-40dc-8afe-a06ed60c3ca0/360_0/35_bf6dbba6-be43-41f6-862e-33c4acad1c88_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c3da7070-9501-40dc-8afe-a06ed60c3ca0/tl-PH-3c6dd940-f9e9-43e7-9554-3fe01cfff485/tl-PH-14d69265-7f0e-41ef-b973-49329c004613.m3u8"
},

ep36: {
  video: "https://video-v6.mydramawave.com/vt/e4255e2d-71d4-41c5-bc8e-1346a07b55b7/360_0/36_331dd6b5-6fd7-44a2-9bf3-9854619784b5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e4255e2d-71d4-41c5-bc8e-1346a07b55b7/tl-PH-4bab89a2-d126-4266-8499-98526f815e8e/tl-PH-3bdbfe96-eef5-4023-96cb-7f92741b412c.m3u8"
},

ep37: {
  video: "https://video-v81.mydramawave.com/vt/8a54e220-5bb2-4a6d-93cf-f627a1e2531d/360_0/37_6f9de115-8053-4f97-ad6b-fc65a60e5e16_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8a54e220-5bb2-4a6d-93cf-f627a1e2531d/tl-PH-f86e2d40-775c-4b67-8194-84044a5504dc/tl-PH-4d581480-90b4-4473-9134-58691ca7bd97.m3u8"
},

ep38: {
  video: "https://video-v81.mydramawave.com/vt/b740b405-9095-444c-b788-7fb39f0be80b/360_0/38_524cd575-cfbe-4d16-87e4-7b406197c969_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b740b405-9095-444c-b788-7fb39f0be80b/tl-PH-79f32232-ca5a-4572-8fe3-ba2eef921d5f/tl-PH-7f837989-b38b-45ad-a132-a0032dae49b3.m3u8"
},

ep39: {
  video: "https://video-v81.mydramawave.com/vt/de782892-c956-48b6-bb0c-b12939245320/360_0/39_cd7519cd-6011-46e4-85a6-d459abbe5eda_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/de782892-c956-48b6-bb0c-b12939245320/tl-PH-a44386cf-99b1-48d5-af5f-381e16d33607/tl-PH-e079a9da-4ff3-48bb-a6c4-e8935e857fe1.m3u8"
},

ep40: {
  video: "https://video-v81.mydramawave.com/vt/f7302acf-6415-4aca-a315-b82f9342dc64/360_0/40_6f688ab0-1b77-4b16-9a18-427f2c13c629_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f7302acf-6415-4aca-a315-b82f9342dc64/tl-PH-4d9c8a99-6ba7-4da2-bdab-e9c105beacc4/tl-PH-f7cfbcd1-cda9-4f6f-a989-18c6ab164841.m3u8"
},
  ep41: {
  video: "https://video-v81.mydramawave.com/vt/5848cbf8-3a46-4f96-b73f-578ab27fd313/360_0/41_2b26a39b-e50a-4666-ab7a-2c58bfe6d241_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5848cbf8-3a46-4f96-b73f-578ab27fd313/tl-PH-f77a6698-1418-4d79-93c1-49cfe2649ddb/tl-PH-a86ff30d-6a57-4ace-8c25-ec5065b11a06.m3u8"
},

ep42: {
  video: "https://video-v81.mydramawave.com/vt/a7ae118d-45e4-4b57-8bb8-30b219be9ae0/360_0/42_bdddecd6-8f35-48f5-9220-46e225b266e0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a7ae118d-45e4-4b57-8bb8-30b219be9ae0/tl-PH-048b7e18-7d81-4c3a-ab11-7e073d02cb1c/tl-PH-ee8fd9f7-dce3-470a-b6b9-c5f90dd2aa0f.m3u8"
},

ep43: {
  video: "https://video-v81.mydramawave.com/vt/174e2681-3230-4d63-8e7d-690caa369299/360_0/43_5323fcc6-2b44-4d2a-87a5-27514bb83e25_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/174e2681-3230-4d63-8e7d-690caa369299/tl-PH-94fd6c3f-4a4b-44c2-8cf5-faa90f24d997/tl-PH-2ab1f66f-cc02-4fce-8408-bd5e0eebf288.m3u8"
},

ep44: {
  video: "https://video-v81.mydramawave.com/vt/39469b17-de62-45a9-8e89-f934dbb1b8d6/360_0/44_87b3200f-eeba-4917-b860-612fd1dbc5b1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/39469b17-de62-45a9-8e89-f934dbb1b8d6/tl-PH-3b4e8710-0290-45f1-97dc-36946d7192c2/tl-PH-2bc2cdda-88f5-4c50-9d86-abf625c5f120.m3u8"
},

ep45: {
  video: "https://video-v6.mydramawave.com/vt/38a75840-7763-4f06-93d3-f5707b47963c/360_0/45_1c5aef1d-b2cd-4d39-9606-8753a630c119_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/38a75840-7763-4f06-93d3-f5707b47963c/tl-PH-e02fdbf2-5e66-4928-9cc2-4aac9bfe28e2/tl-PH-60dd5217-659c-43ad-bce5-36e1b5205bf8.m3u8"
},

ep46: {
  video: "https://video-v81.mydramawave.com/vt/fe8aace5-10b3-4fec-a375-ead6e291a56f/360_0/46_945e2378-53a4-4e72-9e6d-578671f84025_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/fe8aace5-10b3-4fec-a375-ead6e291a56f/tl-PH-084721d6-6fa1-448c-8b1a-233e7cf6e126/tl-PH-7eb076ae-7676-4bae-89ff-65530f2d4362.m3u8"
},

ep47: {
  video: "https://video-v81.mydramawave.com/vt/692aab02-af8c-4281-90e5-b8b9406f108b/360_0/47_e091c613-77ae-412d-8574-cf57b2e6cbe3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/692aab02-af8c-4281-90e5-b8b9406f108b/tl-PH-2da8aa2a-1787-4726-8e4e-31c4d76913da/tl-PH-c2a8ab7a-bba9-425d-81be-4ed2cdd25d98.m3u8"
},

ep48: {
  video: "https://video-v81.mydramawave.com/vt/bb042ba8-7327-4b97-90b0-baa95aef3e03/360_0/48_8a3e18d1-8296-4b62-a2c3-7a03116fa66d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/bb042ba8-7327-4b97-90b0-baa95aef3e03/tl-PH-9007811c-8628-494b-b27a-0cbfd6c15362/tl-PH-3b09a529-1b70-4379-a428-27221c72615e.m3u8"
},

ep49: {
  video: "https://video-v81.mydramawave.com/vt/7a06d69b-3c5f-4f8e-91b4-a842242cb7b8/360_0/49_10aa9356-7b45-4e5a-a193-165c8569c08f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7a06d69b-3c5f-4f8e-91b4-a842242cb7b8/tl-PH-0916ccf3-f71d-4ebc-835a-ef5f58e36801/tl-PH-d6bc6a81-d4f3-44bf-bf3e-18e943656857.m3u8"
},

ep50: {
  video: "https://video-v6.mydramawave.com/vt/74bf2e64-a818-40b8-b49c-1aa5c3e9711e/360_0/50_ebe4b1af-ddc9-4138-88f2-40a58cf2aede_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/74bf2e64-a818-40b8-b49c-1aa5c3e9711e/tl-PH-4bd4a7f0-9b0b-4edf-ba57-137d71f396ad/tl-PH-47dee8cf-4de2-43b0-afb7-c0b068858668.m3u8"
}
};

// 🔥 Storage
const OUTPUT = path.join(process.cwd(), "streams");
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

// 🔥 Track running jobs (avoid duplicate ffmpeg)
const running = {};

// 🔥 Generate VOD (ON DEMAND)
function generateVOD(ep) {
  return new Promise((resolve) => {
    if (running[ep]) return resolve("already running");

    const stream = EPISODES[ep];
    if (!stream) return resolve("invalid");

    const dir = path.join(OUTPUT, ep);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const outputFile = path.join(dir, "index.m3u8");

    if (fs.existsSync(outputFile)) {
      return resolve("ready");
    }

    console.log(`🎬 Generating ${ep}...`);
    running[ep] = true;

    const headers =
      "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\nOrigin: https://mydramawave.com\r\n";

    const args = [
      "-headers", headers,
      "-i", stream.video,

      "-headers", headers,
      "-i", stream.audio,

      "-map", "0:v:0",
      "-map", "1:a:0",

      "-c:v", "copy",
      "-c:a", "aac",

      "-f", "hls",
      "-hls_time", "6",
      "-hls_playlist_type", "vod",
      "-hls_list_size", "0",
      "-hls_flags", "independent_segments",

      outputFile
    ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (d) => {
      console.log(`[${ep}] ${d}`);
    });

    ffmpeg.on("close", (code) => {
      running[ep] = false;
      if (code === 0) {
        console.log(`✅ ${ep} DONE`);
        resolve("done");
      } else {
        console.log(`❌ ${ep} FAILED`);
        resolve("failed");
      }
    });
  });
}

// 🔥 Serve files
app.use("/vod", express.static(OUTPUT));

// 🔥 ON-DEMAND endpoint (KEY FIX)
app.get("/vod/:ep/index.m3u8", async (req, res) => {
  const ep = req.params.ep;
  const file = path.join(OUTPUT, ep, "index.m3u8");

  if (!fs.existsSync(file)) {
    console.log(`⚡ On-demand generate ${ep}`);
    await generateVOD(ep);
  }

  if (fs.existsSync(file)) {
    return res.sendFile(path.resolve(file));
  } else {
    return res.status(500).send("❌ Failed to generate stream");
  }
});

// 🔥 Playlist
app.get("/playlist.m3u", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;
  let m3u = "#EXTM3U\n\n";

  Object.keys(EPISODES).forEach((ep, i) => {
    m3u += `#EXTINF:-1 group-title="🎬 Drama",Episode ${i + 1}\n`;
    m3u += `${base}/vod/${ep}/index.m3u8\n\n`;
  });

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3u);
});

// 🔥 Debug
app.get("/debug", (req, res) => {
  let status = {};
  Object.keys(EPISODES).forEach(ep => {
    const file = path.join(OUTPUT, ep, "index.m3u8");
    status[ep] = fs.existsSync(file) ? "READY" : "NOT READY";
  });
  res.json(status);
});

// 🔥 Root
app.get("/", (req, res) => {
  res.send("🎬 VOD Server (Render Ready)");
});

// 🔥 Start
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
