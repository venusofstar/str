
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v6.mydramawave.com/vt/9866e675-cd51-4e44-a57b-dda7dad78171/1_ef91b293-92b5-4898-9e16-69c439bfdd73_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9866e675-cd51-4e44-a57b-dda7dad78171/tl-PH-dbd1077c-d66f-4c49-8725-e386f0f88072/tl-PH-65481936-a936-40a8-aac3-99fa29215bdb.m3u8"
},

ep2: {
  video: "https://video-v6.mydramawave.com/vt/5174f97d-b271-4ec0-bcb9-a7660f022e9a/2_6ba78f64-2c0a-451c-b1a5-84de14be4f6f_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5174f97d-b271-4ec0-bcb9-a7660f022e9a/tl-PH-358e7829-fae8-4c0c-950b-a1840b32c5ed/tl-PH-a691783a-0376-439e-bfcc-486cfeda1e65.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/d4d62a92-ff95-4be2-8c49-310457b8a8f9/3_034ee6bb-89de-4f5c-8929-ca92bd040184_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d4d62a92-ff95-4be2-8c49-310457b8a8f9/tl-PH-f73a958a-01b0-41c6-b9ae-ddbf99a2a231/tl-PH-ed0e515b-5548-4840-b586-ab0c07afa8e7.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/cf784c58-94a8-484b-a54d-6c79b1facd1f/4_4ff49365-9042-43a1-b364-6ecd8043d90b_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/cf784c58-94a8-484b-a54d-6c79b1facd1f/tl-PH-5266b2ee-06d0-4e8b-b07b-67f957d930f7/tl-PH-215c7efd-895c-4990-b7a9-35156bb0327a.m3u8"
},

ep5: {
  video: "https://video-v6.mydramawave.com/vt/5765a792-c5f5-4734-935c-9cdba4056309/5_7f6c3613-e106-4d72-92fe-15bc69d3a3c0_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5765a792-c5f5-4734-935c-9cdba4056309/tl-PH-e8ebc90a-6936-4401-9d20-887de22ff145/tl-PH-36efb977-e157-4c41-b2c8-6e0c5598f833.m3u8"
},

ep6: {
  video: "https://video-v6.mydramawave.com/vt/4cb0e8f1-8669-4998-a200-47576a00d0c1/6_c0cbe4e9-7946-4fdf-9ec7-89127ee82a5d_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/4cb0e8f1-8669-4998-a200-47576a00d0c1/tl-PH-e3b007c4-fc82-4747-96c4-c5bbfa2622f0/tl-PH-43a8667a-bed7-4a88-94bf-6c6dd9eedcd0.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/387288b1-f62c-49a2-a889-8e862cc415a8/7_7ab61033-bfef-4509-8b2f-1fc6d23d26cd_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/387288b1-f62c-49a2-a889-8e862cc415a8/tl-PH-984ef23d-4fe3-40e7-bd0f-c1e2c847f81b/tl-PH-5afab5f5-50f8-4c56-b486-84c7e2d4a574.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/6a4d73d8-8c4f-4029-b2b0-109794e3b9a5/8_4e830893-ebd3-46fe-bf0c-49e6beebee4b_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/6a4d73d8-8c4f-4029-b2b0-109794e3b9a5/tl-PH-c30ddc6f-7bf6-41a6-b923-c72b67fa7b88/tl-PH-7f71b57f-5db6-420a-b2ef-bebd23a6d3af.m3u8"
},

ep9: {
  video: "https://video-v6.mydramawave.com/vt/1df825c1-4e3d-423e-9186-f0c3746cc8d9/9_82578f67-a48f-4b44-86af-db0e806f8c85_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1df825c1-4e3d-423e-9186-f0c3746cc8d9/tl-PH-560145b6-9815-4423-a9e5-9513362980fd/tl-PH-cfe52d55-ca7c-43ae-b99e-9d42baeeac0c.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/4887b07f-7660-4690-b549-7a1ea987699c/10_cda119e9-6f4b-4582-94b1-7ea6c0fbb122_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4887b07f-7660-4690-b549-7a1ea987699c/tl-PH-2ac7218a-0b87-4cfb-a5d9-e34784acc191/tl-PH-53dd0402-b363-498f-a99d-dbd6a228c0ea.m3u8"
},
  ep11: {
  video: "https://video-v6.mydramawave.com/vt/3f773ede-7fc6-4ed5-bea9-be0aabff095c/11_f43fd46d-d90f-4cf4-b478-c07c782ebfb3_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/3f773ede-7fc6-4ed5-bea9-be0aabff095c/tl-PH-860e4100-3d4d-4f52-bc39-3cec786b6fcf/tl-PH-fdca8b96-c233-47f8-92fd-f269dce284e3.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/c9ec8813-2dc4-4a01-8da8-faafa0edf8c1/12_abbb8d1d-12f1-40d4-a204-86f410efc34a_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c9ec8813-2dc4-4a01-8da8-faafa0edf8c1/tl-PH-6998de14-fa2a-4154-893c-b1e15cabe8c9/tl-PH-8820c6bc-c5af-4fec-89c8-2b938eb356eb.m3u8"
},

ep13: {
  video: "https://video-v81.mydramawave.com/vt/4ec54720-6290-487e-a406-f3c9b9a4b72d/13_b4e42a2e-3939-4f92-b674-69712cbe1703_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4ec54720-6290-487e-a406-f3c9b9a4b72d/tl-PH-8eece8d2-1233-4738-a459-7ab344ba7793/tl-PH-32870352-f381-4730-87b3-4e38eb9586f0.m3u8"
},

ep14: {
  video: "https://video-v81.mydramawave.com/vt/9005e785-dc61-4730-aaf2-093cc63d02ec/14_0c9d740c-e3ff-4374-b2f0-b26446d3f925_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9005e785-dc61-4730-aaf2-093cc63d02ec/tl-PH-39ef8443-3527-4454-a2eb-ed9987da0644/tl-PH-e28cec45-6db7-468b-bfcf-2a65acb59b03.m3u8"
},

ep15: {
  video: "https://video-v81.mydramawave.com/vt/3865d68a-7cd4-4e6e-bf06-19492f792e49/15_b0bbbb90-76b6-492d-ac91-b49bdaa57b69_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3865d68a-7cd4-4e6e-bf06-19492f792e49/tl-PH-5d675262-b0a9-48ab-ac69-6fecbda6f25c/tl-PH-87011e1a-8588-4693-b05e-79bffa1119f7.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/9749fb57-461b-4e3c-b8a8-13df81a78758/16_f91dba94-bd54-4b70-b9ea-3a2d50914f63_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9749fb57-461b-4e3c-b8a8-13df81a78758/tl-PH-9cb2709b-5785-4a83-80a8-173490c6bd54/tl-PH-def598f6-8f43-4b21-803c-b23c50f0e549.m3u8"
},

ep17: {
  video: "https://video-v81.mydramawave.com/vt/bd44a732-0e2c-4ada-8308-2a3eb458e598/17_9479ddd8-bd4b-4bd8-9fc6-b592bf327ba4_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/bd44a732-0e2c-4ada-8308-2a3eb458e598/tl-PH-c12df807-3136-405e-944f-509e145bdb11/tl-PH-b441faeb-94e4-47a6-bd20-d48639736112.m3u8"
},

ep18: {
  video: "https://video-v81.mydramawave.com/vt/88c1fd2c-9b8b-4696-a29f-5ed49aaa5d61/18_1fdecc25-c00c-4e3e-a194-30a0af66aacf_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/88c1fd2c-9b8b-4696-a29f-5ed49aaa5d61/tl-PH-e7849f4a-815a-4d2d-aa59-4987549e09f8/tl-PH-bcde929a-fa14-4326-8628-3a8e138f9b7a.m3u8"
},

ep19: {
  video: "https://video-v81.mydramawave.com/vt/b99c4093-9101-4662-b2b1-bd03da45b0c4/19_9739d886-8e49-44c7-ad38-d0a7900d77e6_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b99c4093-9101-4662-b2b1-bd03da45b0c4/tl-PH-1003dbc9-76d1-49fd-8c73-159ec28aa759/tl-PH-ca457c77-1b61-4103-b070-f4949ae52669.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/7f4d1920-69fa-4dd5-ada7-79ce145ba1cd/20_a8bb9bdf-03b9-4ff1-83c0-46ccb4d38c86_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7f4d1920-69fa-4dd5-ada7-79ce145ba1cd/tl-PH-cc75aefb-4357-4a62-bd5d-fa4d4c9172cd/tl-PH-3b4b0e83-1ddc-44e4-945a-159f26e5eea2.m3u8"
},
ep21: {
  video: "https://video-v81.mydramawave.com/vt/4de77fa5-ff78-4b12-b459-d54cd84d3682/21_98055cf5-3d92-4135-809d-d960be4c82a8_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4de77fa5-ff78-4b12-b459-d54cd84d3682/tl-PH-8e7a7c65-e4ae-48f2-815c-f1cfe131944c/tl-PH-9051540a-8f93-400c-95fc-37b9f9e8a9fd.m3u8"
},

ep22: {
  video: "https://video-v81.mydramawave.com/vt/50bb6aa5-61cd-46a7-837a-2e77083313d0/22_b486f1d3-3150-48f9-8e40-ce46cdeb4e79_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/50bb6aa5-61cd-46a7-837a-2e77083313d0/tl-PH-cb6b5d19-9cbd-43d2-9bb7-34099b0604a8/tl-PH-c8acf62d-9cf0-470d-83b8-96e236d98fdf.m3u8"
},

ep23: {
  video: "https://video-v81.mydramawave.com/vt/d2a6aff1-be56-40c7-a7f9-ede85eea3d8e/23_6e956b84-e2bb-4b9c-aa52-c3ade45f61c0_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d2a6aff1-be56-40c7-a7f9-ede85eea3d8e/tl-PH-174e34f1-fffb-45bf-a88f-8cc3993c686f/tl-PH-418d5ef3-dd8b-42e5-8889-010e52479470.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/a37056ce-577d-4530-bcfb-a43ee6681385/24_57f362e9-06ee-468e-a9b9-aff876c81e98_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a37056ce-577d-4530-bcfb-a43ee6681385/tl-PH-f244c1f8-7f6b-462d-9d8e-1d1bcfaca229/tl-PH-04367af2-0bd3-4035-a631-0f8b67da5299.m3u8"
},

ep25: {
  video: "https://video-v81.mydramawave.com/vt/54253717-e1c1-4174-977d-bca4ace329bb/25_15dd3bf9-334f-436d-b4e1-831781ebbdb3_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/54253717-e1c1-4174-977d-bca4ace329bb/tl-PH-03bc7fed-e423-45f1-a166-68453d986ad5/tl-PH-7bf246f1-57c4-4cc4-b7f8-fb7e5e22c501.m3u8"
},

ep26: {
  video: "https://video-v81.mydramawave.com/vt/52ab66e1-3df9-49e6-a7b3-514c3826c88d/26_85e6e872-379d-49e5-b5d6-663e515a7a9b_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/52ab66e1-3df9-49e6-a7b3-514c3826c88d/tl-PH-2f837970-8f3b-4f10-a2b2-721d93d97132/tl-PH-1d3dad58-f3b2-4ca9-8cfa-b2dc8d62e62b.m3u8"
},

ep27: {
  video: "https://video-v81.mydramawave.com/vt/b2d5c01b-44de-4c70-82b9-a417dc9fa1db/27_c987cbaf-0395-461c-b4a9-97e85b76e293_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b2d5c01b-44de-4c70-82b9-a417dc9fa1db/tl-PH-46f2b1ad-e872-485a-aaa6-81aab50d054a/tl-PH-70dc9aaa-2d34-46cc-8608-49e6dffd5796.m3u8"
},

ep28: {
  video: "https://video-v81.mydramawave.com/vt/74492308-31c3-49f9-803c-f2d7a4356d41/28_c98ee5ad-097c-4863-aef9-77e5e2395476_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/74492308-31c3-49f9-803c-f2d7a4356d41/tl-PH-91ecceac-22a3-470c-a4e6-f99fc21d64f1/tl-PH-b75fea37-8c9a-405f-ad06-396bc9642aeb.m3u8"
},

ep29: {
  video: "https://video-v6.mydramawave.com/vt/0bf5c380-fdb8-4462-9981-d16ee9b118f4/29_7a6b343b-0a11-413a-918f-48f5f31ac011_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0bf5c380-fdb8-4462-9981-d16ee9b118f4/tl-PH-6984718a-89cb-4dbb-93e1-fee8148ca895/tl-PH-64b76087-60aa-4308-9605-da7615df52d9.m3u8"
},

ep30: {
  video: "https://video-v81.mydramawave.com/vt/c9491174-26ea-4ce5-abbd-fa04ee502be7/30_14d7cf23-a0f1-42fc-8d3e-5a17517883fc_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c9491174-26ea-4ce5-abbd-fa04ee502be7/tl-PH-3807f01c-6b83-466e-9d73-287b05afcf5c/tl-PH-1e98038f-de75-4b86-bda8-66cee19eb5a1.m3u8"
},
  ep31: {
  video: "https://video-v6.mydramawave.com/vt/8f9565a0-d2c3-444e-8973-989741de8200/31_9d358aaa-cc35-4202-9e15-269fb4539cbb_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8f9565a0-d2c3-444e-8973-989741de8200/tl-PH-a4963d81-e9e7-432b-b450-cec2afc1ef9e/tl-PH-4c97dfd5-2adc-4592-893b-60a31647a3a0.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/5cd034be-7458-4b8c-a393-4705dc1fe727/32_b57bd999-84cb-45eb-a2be-2f800ca60df0_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5cd034be-7458-4b8c-a393-4705dc1fe727/tl-PH-f199c6b0-e745-4002-8078-edc8fe16b01f/tl-PH-a27e9d63-7cb9-49aa-ab1a-95499f26d3bf.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/5f407017-cd07-4b0d-8813-36cbec05eb38/33_fe039e60-d6be-4623-9949-0af862ee49b1_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5f407017-cd07-4b0d-8813-36cbec05eb38/tl-PH-90940fe0-efb4-4102-a05f-6754a2530baf/tl-PH-31e63522-c87b-490a-8662-072249dc3044.m3u8"
},

ep34: {
  video: "https://video-v81.mydramawave.com/vt/8f783538-c60c-48e4-9cdc-3e6ab65bf608/34_31756f10-4e38-4393-8a19-b9370e8e399d_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8f783538-c60c-48e4-9cdc-3e6ab65bf608/tl-PH-8e4ae7ec-6bb8-44f1-97ea-a78aab87fe1d/tl-PH-f5da5109-bf76-4613-8be9-7208e7637b7f.m3u8"
},

ep35: {
  video: "https://video-v6.mydramawave.com/vt/ec6be794-b7bc-4402-96c2-41aa122c85a0/35_8dd5c8e2-344c-4a02-92d6-ccfcd39cbe23_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ec6be794-b7bc-4402-96c2-41aa122c85a0/tl-PH-d8dd2ba2-dd51-4569-a624-d08e9cdf0bc7/tl-PH-a713ced4-6930-4b67-b085-86d1ec025b11.m3u8"
},

ep36: {
  video: "https://video-v6.mydramawave.com/vt/0e925513-b525-4cd4-93bb-1334401aca8a/36_ca913cac-7fda-466e-ae1f-f93b20c1e438_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0e925513-b525-4cd4-93bb-1334401aca8a/tl-PH-f4fcfe31-a8bb-40af-9cbe-f4f6657f36bd/tl-PH-b9992fa1-70d2-4f39-a33b-17b7e4a5b642.m3u8"
},

ep37: {
  video: "https://video-v6.mydramawave.com/vt/f07586b3-e05e-4638-8329-dd1760806923/37_0859553b-adee-4d9e-b5d8-13415858f2eb_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f07586b3-e05e-4638-8329-dd1760806923/tl-PH-c04bdb7d-98de-4696-800d-98ae26e52bdb/tl-PH-dd0a60dc-32da-444d-aff8-51f092d05f61.m3u8"
},

ep38: {
  video: "https://video-v6.mydramawave.com/vt/d0fcbec2-1186-4e71-9a78-54aabe31e635/38_b97f4935-faf6-470e-b9d9-c6e42b823428_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/d0fcbec2-1186-4e71-9a78-54aabe31e635/tl-PH-ca6f422a-a53e-4491-aa83-988d4798efcb/tl-PH-683b7dc3-5549-43ab-a2f0-c50bee76d0b3.m3u8"
},

ep39: {
  video: "https://video-v81.mydramawave.com/vt/a8e3bf22-f7a0-419f-972e-8ef200caa235/39_19847ac0-473c-4487-bb51-291b95563b7e_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a8e3bf22-f7a0-419f-972e-8ef200caa235/tl-PH-a11c89be-a758-4868-9009-ba3f8c4e6c85/tl-PH-098f15a7-032d-4227-b12e-8305ed6d68a9.m3u8"
},

ep40: {
  video: "https://video-v6.mydramawave.com/vt/5a018925-371d-45d1-a64f-eb897581b7ab/40_7df2ec6e-e90f-4273-9faf-e1131a52bb2d_transcode_1309546_adaptiveDynamicStreaming_1307828_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5a018925-371d-45d1-a64f-eb897581b7ab/tl-PH-566be2a1-330c-43c0-a853-3f35b0dc650b/tl-PH-61a156a9-77ca-4d4c-ab14-aedbfdd65463.m3u8"
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
