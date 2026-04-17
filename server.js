
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/c43636c8-25e1-4cfa-ab46-e996cca26587/360_0/1_4f45b546-e7db-47a7-a37f-d874ad762606_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c43636c8-25e1-4cfa-ab46-e996cca26587/tl-PH-ce5fefd4-9cb3-4f5f-b390-3ddc96e3128a/tl-PH-c7c9da0f-5947-4bec-a035-463d5a7ac055.m3u8"
},

ep2: {
  video: "https://video-v6.mydramawave.com/vt/fbdf510d-e0cf-4b7e-848d-ec2ce2c10867/360_0/2_713e386d-8924-490c-ad34-edf6cfb50958_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/fbdf510d-e0cf-4b7e-848d-ec2ce2c10867/tl-PH-06ab91b4-92d8-4f28-b56a-f4a38543047c/tl-PH-ed889991-5aeb-41fc-80c4-bbde89ccd45a.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/ac57f15b-6d7e-421c-a5ec-7e91c92268c4/360_0/3_0a23e06c-51ab-4f96-b41a-813b04e5838e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ac57f15b-6d7e-421c-a5ec-7e91c92268c4/tl-PH-ee6eed38-9aa7-49bb-9575-9b623f8733cd/tl-PH-45da2fa6-3ec6-48b2-930a-0b8c2fed0a5b.m3u8"
},

ep4: {
  video: "https://video-v81.mydramawave.com/vt/da02761e-3068-41bb-815e-cc1d8bb89a96/360_0/4_a5a66c23-3733-4d72-a989-58cd7e620542_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/da02761e-3068-41bb-815e-cc1d8bb89a96/tl-PH-99fb712f-afbd-43d3-b91f-a3835208ca13/tl-PH-a5c0a7b9-dfce-4a94-836c-2cc26e9cc6be.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/3bde859b-3e05-4498-a7da-33444c734118/360_0/5_d495325a-9811-41c9-9e25-8862fa90bbf0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3bde859b-3e05-4498-a7da-33444c734118/tl-PH-acee20d6-8bd6-4e8e-a7f4-113b1ee513eb/tl-PH-491e0c1d-abbb-4740-b31a-4d675c7e489e.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/724c2ebf-32e0-4696-8935-2b5ba789d6b2/360_0/6_c82c8b3e-37ea-4715-8e8b-a0b5d2b739a9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/724c2ebf-32e0-4696-8935-2b5ba789d6b2/tl-PH-616af144-f28b-4b36-85e7-e08de77e47f6/tl-PH-874f0647-0b2f-438b-b891-4ea43ff2822c.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/d47a9e39-1bbf-40a3-b488-adb7c67905e9/360_0/7_56f342f1-e8f7-473d-9844-23e98bba1c82_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d47a9e39-1bbf-40a3-b488-adb7c67905e9/tl-PH-f0a48107-d058-483e-8c43-18cc988215ba/tl-PH-d4f69d3b-69ce-4984-8427-d6b96de6352b.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/8041b5ad-7686-4df7-9cb9-e7c68ce594a3/360_0/8_148fdc40-ef49-4b30-8591-8b5a2a3723d6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8041b5ad-7686-4df7-9cb9-e7c68ce594a3/tl-PH-b3188fae-fa1f-4354-a6fe-ec2d4566c8ec/tl-PH-b6fd2106-8188-4c8d-8ba8-cc6293a6592e.m3u8"
},

ep9: {
  video: "https://video-v6.mydramawave.com/vt/c9632759-f729-43b8-86d0-7dbd384be6fc/360_0/9_35aa0fda-21f5-4035-a033-c9298bd6e71c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c9632759-f729-43b8-86d0-7dbd384be6fc/tl-PH-98c91250-2398-43e4-b65a-1b6fc8f4c513/tl-PH-05f1dea6-0527-43c4-a789-a66ac01b82f1.m3u8"
},

ep10: {
  video: "https://video-v6.mydramawave.com/vt/ceca78f2-0e6d-4f28-bc5f-dc195a18bb09/360_0/10_785a1102-77c0-477e-9137-f35351217652_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ceca78f2-0e6d-4f28-bc5f-dc195a18bb09/tl-PH-9ef3170e-d0b8-496d-bf34-7475ce75e576/tl-PH-fe271a42-6090-48af-90c4-ad75e4b265bc.m3u8"
},
ep11: {
  video: "https://video-v6.mydramawave.com/vt/32840219-a58a-45d7-aa31-690b115bade1/360_0/11_017c959d-92b1-4c7e-8d9b-b989385481cd_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/32840219-a58a-45d7-aa31-690b115bade1/tl-PH-aff0ffe9-1ccd-448c-ba62-071733901540/tl-PH-8f88c98d-0631-4e8c-b574-cd7f4695b114.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/0555e6b7-db65-49f4-8d24-e8f438c9cf3e/360_0/12_7de19d0c-a40a-4ba7-9fda-f94cfb27183d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0555e6b7-db65-49f4-8d24-e8f438c9cf3e/tl-PH-2db04862-d8c7-4675-a7ae-e599939b5310/tl-PH-7f65bc90-95c5-491c-8929-c330f40f15e7.m3u8"
},

ep13: {
  video: "https://video-v81.mydramawave.com/vt/823872ae-84b3-498e-b920-15244218a662/360_0/13_7837e88a-f5df-4cc0-9c83-ddfb7c5031da_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/823872ae-84b3-498e-b920-15244218a662/tl-PH-b3b40bdf-30bf-40c2-87de-401f9cba5ce4/tl-PH-9972fbe9-861a-455e-8d7f-b4ef5e534008.m3u8"
},

ep14: {
  video: "https://video-v6.mydramawave.com/vt/9829c67d-5649-41ff-9be2-543ce2e6f884/360_0/14_22254d24-5d5e-4106-bf1f-2fd18549f317_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9829c67d-5649-41ff-9be2-543ce2e6f884/tl-PH-1fcec702-fd2c-4b29-8ef7-de751538bb82/tl-PH-d1123bdb-c2e2-4fa2-bfd6-70aca4e0f3df.m3u8"
},

ep15: {
  video: "https://video-v6.mydramawave.com/vt/81dc3008-9d82-45cc-8628-4b6260233ed5/360_0/15_716d31c7-9f54-4e5a-9afc-0d48a09cc179_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/81dc3008-9d82-45cc-8628-4b6260233ed5/tl-PH-ef0128cd-52d9-4b88-8ff4-6b24f5b56135/tl-PH-ae101ddd-542f-4c6c-b76a-8c0e06777089.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/a14f0493-1292-4296-b192-44ad4f818e3b/360_0/16_d0402857-2bc9-42e8-aee7-a01fb40cc4e1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a14f0493-1292-4296-b192-44ad4f818e3b/tl-PH-7844078e-6a7a-40ac-92ae-a8e829a10f4a/tl-PH-e7c39a22-dfed-4c85-816e-950334f14e2b.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/2ed443f7-ca39-4f3f-bed5-423f9d09107b/360_0/17_febd238c-be97-4ad2-9d76-9697312dc2a7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/2ed443f7-ca39-4f3f-bed5-423f9d09107b/tl-PH-41636f2c-ae7a-4e43-ba60-ba0fbf53e541/tl-PH-47422bd4-894a-4ceb-a219-f0f45c1bf62f.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/c3d8dc45-f3b2-4d1f-97d2-9929b16f5c7b/360_0/18_84215513-05eb-439b-a99b-17a264fd0996_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c3d8dc45-f3b2-4d1f-97d2-9929b16f5c7b/tl-PH-6f830ee2-c112-4292-bb13-e0470f07766c/tl-PH-c433d81e-284e-4171-920a-353793920d2d.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/b9833540-7c92-4d57-b073-9a18b47aaa32/360_0/19_f1289f24-9f85-42ae-9d30-010ed7aafde8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b9833540-7c92-4d57-b073-9a18b47aaa32/tl-PH-e1ba99ee-79ad-4b76-984c-4cd54dbe75a1/tl-PH-debe79b5-1da8-4e1f-82b3-ed97ef52cedb.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/3bfca47d-5ce7-4d9c-874a-2216d340006d/360_0/20_5fb032e6-8d19-4793-8dbd-b80a35878b75_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3bfca47d-5ce7-4d9c-874a-2216d340006d/tl-PH-92f4de61-aca4-44c2-8004-7b5b6e0dc179/tl-PH-77fa6119-619a-4df3-a68a-584b9ebb2fd3.m3u8"
},
ep21: {
  video: "https://video-v81.mydramawave.com/vt/26db5e43-4f4d-4696-a905-ce383ffe300f/360_0/21_bf4aa20b-73e4-4300-88f4-0bc1c7687f9e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/26db5e43-4f4d-4696-a905-ce383ffe300f/tl-PH-2d520348-d8c2-4f9f-a9c0-194589bd2fd1/tl-PH-05c3b68a-437e-43b2-a41d-38a6ba99d5a0.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/30e7047c-d5a2-496c-a9d2-a87b81b34c94/360_0/22_97f2fe63-f18e-4ee4-b8c1-99fbac342d26_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/30e7047c-d5a2-496c-a9d2-a87b81b34c94/tl-PH-4a7c7d91-9983-4283-88cb-291a797a6f98/tl-PH-6c9ba050-173c-4dfc-bf87-9abd7110d1a7.m3u8"
},

ep23: {
  video: "https://video-v81.mydramawave.com/vt/0d537fc8-bb80-4041-8d10-d0023a7421b8/360_0/23_e24ce3bf-32c5-493e-9516-36b66b9a5cc2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/0d537fc8-bb80-4041-8d10-d0023a7421b8/tl-PH-373a44f2-d439-4b82-a752-a17c7ca7ddf4/tl-PH-5504de2e-2be3-44e9-9802-eda135dd231d.m3u8"
},

ep24: {
  video: "https://video-v6.mydramawave.com/vt/b084adb1-e40e-4218-87d3-c3520373ec9b/360_0/24_76a35f80-e758-4987-87dc-2f6ec17a2481_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b084adb1-e40e-4218-87d3-c3520373ec9b/tl-PH-f0c4e425-d946-4a6d-a2ba-b7a061f79cd3/tl-PH-173aa334-7f2c-48ff-8e06-96c3cb84ff2d.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/5e341400-1b31-491e-b855-4bbd8890a55f/360_0/25_44599aff-98ba-42f2-b629-ea753861b33a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5e341400-1b31-491e-b855-4bbd8890a55f/tl-PH-cc03c988-dca7-4dba-aea2-81e671d2b8cd/tl-PH-58d87bff-20fe-44bd-bd90-26709a15ad20.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/9b552cad-bcfa-4559-b4d4-b49dca4f0926/360_0/26_ec4807e8-3fe5-43e3-af5c-33ddf6db7e83_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9b552cad-bcfa-4559-b4d4-b49dca4f0926/tl-PH-387d989c-38cd-4d87-a5af-0ed625697749/tl-PH-d13e8177-17f0-4a63-958d-4b4894336617.m3u8"
},

ep27: {
  video: "https://video-v81.mydramawave.com/vt/8cd94393-530b-491f-af2d-e0c19198431a/360_0/27_5b349427-4fc3-47e0-816a-9f3f81620aae_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8cd94393-530b-491f-af2d-e0c19198431a/tl-PH-313c440a-21d9-4604-a094-a9f57f80c26f/tl-PH-d8f5269d-f33d-48fd-aef3-f81e61a50e29.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/06a8e619-e16f-41d6-988e-65e33dec6c9f/360_0/28_5388e4c7-6aeb-4c2f-849c-e7004bed50e0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/06a8e619-e16f-41d6-988e-65e33dec6c9f/tl-PH-f1369351-66ac-4dd2-bef5-39a6ead38f9c/tl-PH-962a607a-030e-4bd8-b844-cef90e685c31.m3u8"
},

ep29: {
  video: "https://video-v81.mydramawave.com/vt/395e1b47-e610-444b-adc3-413058873cae/360_0/29_2891b893-3e65-4042-a507-c6cf92d3b363_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/395e1b47-e610-444b-adc3-413058873cae/tl-PH-eaca9027-3081-409e-a63e-9cf4e855eff9/tl-PH-9c5a0d18-c82f-4ee0-8bea-c0b8976ea91b.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/8ea2b85e-fc7f-4edc-ae8c-d750aaf780ca/360_0/30_30255fb6-bf9d-4b8d-aae7-3e43a05fc4d3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8ea2b85e-fc7f-4edc-ae8c-d750aaf780ca/tl-PH-35d24a12-729c-40a6-969b-4e677f30f061/tl-PH-09daa9d0-2b28-4f6c-b3a8-11c2fd213473.m3u8"
},

ep31: {
  video: "https://video-v81.mydramawave.com/vt/d64b7b76-b85a-4289-b508-9277ece56d83/360_0/31_c4770167-98f9-4dc2-baca-39fba73606ab_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d64b7b76-b85a-4289-b508-9277ece56d83/tl-PH-4c29552f-4a0b-4330-aae1-b49d21e77a13/tl-PH-c3a7e257-17e4-4715-801f-c49d38083df9.m3u8"
},

ep32: {
  video: "https://video-v6.mydramawave.com/vt/fa1c4014-5e90-46b2-a70b-a544b05e5244/360_0/32_a62394a9-81e2-4de0-928e-3daa5fba56c7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/fa1c4014-5e90-46b2-a70b-a544b05e5244/tl-PH-8240a57b-8622-44cf-8c99-776cb97c1058/tl-PH-22843549-b3ab-4b4b-832e-2986a81db12b.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/35df743c-5277-4640-9335-bb056f8a6020/360_0/33_2e8fa7b1-98d1-49b6-aa04-2d5abedf4b41_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/35df743c-5277-4640-9335-bb056f8a6020/tl-PH-aa786738-0698-4479-8862-ce411bb6d99a/tl-PH-823d0748-ac0d-42fa-ad73-5d123c064b8d.m3u8"
},

ep34: {
  video: "https://video-v6.mydramawave.com/vt/21c6ac86-eb84-4f82-8fa2-68208c63ef25/360_0/34_e99fee4e-3d2d-4f3f-a800-e3ecc9776b45_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/21c6ac86-eb84-4f82-8fa2-68208c63ef25/tl-PH-c27c8f08-3da1-4ea8-8776-485a223b5661/tl-PH-740986a2-3a8b-4c2d-a097-b463b4d3c4c6.m3u8"
},

ep35: {
  video: "https://video-v81.mydramawave.com/vt/e08453ea-b638-4ce0-99fb-6862bd2197e7/360_0/35_caa6afd6-e019-43f7-a35c-a1a6462340f1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e08453ea-b638-4ce0-99fb-6862bd2197e7/tl-PH-2af0ad71-1e71-49aa-8dc4-535f1ed499f2/tl-PH-a1e9c374-8a6d-4a1c-9c9d-7c8efbe536d4.m3u8"
},

ep36: {
  video: "https://video-v81.mydramawave.com/vt/36e76a62-a543-45ae-9bdd-c38315e359c8/360_0/36_c3ba5053-e668-407a-b088-b221926df538_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/36e76a62-a543-45ae-9bdd-c38315e359c8/tl-PH-6b6b902d-9ffd-409a-973f-16b6ca089f12/tl-PH-61aee0b5-5a86-4e4b-8255-25092b5f574e.m3u8"
},

ep37: {
  video: "https://video-v81.mydramawave.com/vt/7d8d81f0-660c-4c06-948a-aed543470d84/360_0/37_daa01b25-72d5-4fad-98e4-0a994f0eabba_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7d8d81f0-660c-4c06-948a-aed543470d84/tl-PH-b234607e-c4e9-41ee-86a9-8e177750fd4a/tl-PH-253f6a89-9106-479d-ac22-97f805c33771.m3u8"
},

ep38: {
  video: "https://video-v81.mydramawave.com/vt/a2b33db3-3ed2-4860-bd33-7ba3bd6ff9d7/360_0/38_69cfaf33-1194-43de-b247-9cd0343d059e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a2b33db3-3ed2-4860-bd33-7ba3bd6ff9d7/tl-PH-0afa83e9-16bf-4c29-8e12-9b8134e80c53/tl-PH-3bd2d5b5-fc15-4431-8d98-3742bbcd72fe.m3u8"
},

ep39: {
  video: "https://video-v81.mydramawave.com/vt/384d9a75-5351-48b7-82a2-ecefcbb1a5ca/360_0/39_ad95f23b-d232-442a-b5d3-78b8589eff58_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/384d9a75-5351-48b7-82a2-ecefcbb1a5ca/tl-PH-4c89cbcc-f7c4-4fcc-a8d7-df1f4fc932be/tl-PH-fc4e08c1-d25b-4609-a443-3bf4a56548d9.m3u8"
},

ep40: {
  video: "https://video-v81.mydramawave.com/vt/6272de9b-e717-449b-a7e9-870e1d6b2839/360_0/40_e20e7834-43e2-4826-b006-75e1884dee12_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6272de9b-e717-449b-a7e9-870e1d6b2839/tl-PH-876c5f3e-2c91-4fd6-8346-418b90c73054/tl-PH-23b7578e-33dc-4fac-a6d0-590613ac51aa.m3u8"
},
ep41: {
  video: "https://video-v81.mydramawave.com/vt/1eab3511-86e0-4b38-b858-f28569170027/360_0/41_cade69cf-baab-44c5-9235-1846db99c23f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1eab3511-86e0-4b38-b858-f28569170027/tl-PH-f3e5cb27-23fc-4f35-9e95-9806a95669a1/tl-PH-a65dbdbb-8b33-45da-864b-76e9f27a7abb.m3u8"
},

ep42: {
  video: "https://video-v81.mydramawave.com/vt/a4e88de0-84fb-48f7-8c0e-b146c587351b/360_0/42_7d7189da-e3f6-4f52-ac9c-4d89cdf531de_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a4e88de0-84fb-48f7-8c0e-b146c587351b/tl-PH-a42a9ee8-70f8-481e-a424-4f5c0eaeba69/tl-PH-1a10e26e-1e00-40e1-b026-5c0c7920cbb4.m3u8"
},

ep43: {
  video: "https://video-v6.mydramawave.com/vt/345b74cf-664a-49ac-a148-ba4306c136f9/360_0/43_59b557f7-dc2f-465b-968b-805db0833c39_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/345b74cf-664a-49ac-a148-ba4306c136f9/tl-PH-96d88b29-ffbe-46c5-96b4-778835a1cdb0/tl-PH-543afdb1-a2b7-4986-af65-ec26fb2b8d99.m3u8"
},

ep44: {
  video: "https://video-v6.mydramawave.com/vt/02836ff2-e448-4d31-a983-d6b66b7c66ac/360_0/44_1026dbe5-5053-42c6-a3c4-f669782b414d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/02836ff2-e448-4d31-a983-d6b66b7c66ac/tl-PH-48100c20-8c44-4157-a93f-baa82c9c27f2/tl-PH-2964aa82-ee00-4808-bc1e-ef08d877a0a8.m3u8"
},

ep45: {
  video: "https://video-v6.mydramawave.com/vt/25799e33-3296-4c28-94e3-1bd1ec49d2a1/360_0/45_b7a08d31-ce4f-4c82-9ea1-0f260a178ce4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/25799e33-3296-4c28-94e3-1bd1ec49d2a1/tl-PH-4a1842b0-c726-4378-bd63-9c52f8ca2729/tl-PH-afa136bd-f280-4999-a033-cf7a94926386.m3u8"
},

ep46: {
  video: "https://video-v6.mydramawave.com/vt/56fee328-4088-4fa6-b6f3-3f8f39bbed9e/360_0/46_afe9a66a-1726-4b82-9776-34a8f0f14829_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/56fee328-4088-4fa6-b6f3-3f8f39bbed9e/tl-PH-60786b16-52b5-4d31-91d2-161854421671/tl-PH-4c1ebb87-de2d-470f-b92a-a29fe7ff17a0.m3u8"
},

ep47: {
  video: "https://video-v6.mydramawave.com/vt/a7397c78-233c-4d30-902c-642848beb3f7/360_0/47_f0b727ce-a220-4d74-b05a-12bf98097f84_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a7397c78-233c-4d30-902c-642848beb3f7/tl-PH-c0af9366-1c45-4aea-b2b2-73a007fa9d77/tl-PH-c61e294a-57c4-4707-afed-05de811d22f1.m3u8"
},

ep48: {
  video: "https://video-v6.mydramawave.com/vt/25aac669-383f-4d4d-a448-b157d634ca67/360_0/48_7f409ead-c615-464a-afb5-825e53d9cff1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/25aac669-383f-4d4d-a448-b157d634ca67/tl-PH-bc114a55-370b-4233-a151-5b72ceb9a564/tl-PH-75d088f2-4bb1-44ef-972c-66bdd72d0f26.m3u8"
},

ep49: {
  video: "https://video-v81.mydramawave.com/vt/8c9b8847-dd5b-43f9-b3b9-826615e14ce0/360_0/49_c4979407-8207-4a91-ad39-0d472bbb2616_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8c9b8847-dd5b-43f9-b3b9-826615e14ce0/tl-PH-824b4020-c52f-4948-aed1-e7d4deeb0675/tl-PH-eec5ace6-6e32-4542-be15-0469358ac838.m3u8"
},

ep50: {
  video: "https://video-v6.mydramawave.com/vt/f31c3215-e6fa-4b9c-88e9-f595fcbc27ac/360_0/50_a72bf32f-adce-4d7a-bfd1-4cef97732970_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f31c3215-e6fa-4b9c-88e9-f595fcbc27ac/tl-PH-b616c3a4-97a7-48a4-a49c-9492c13266b7/tl-PH-641e2d89-b6b5-417d-b92b-f8cb260b8cfc.m3u8"
},
ep51: {
  video: "https://video-v81.mydramawave.com/vt/a73c4c83-f574-4dd1-bd04-2ea0e5da5546/360_0/51_dd4a234f-2742-4614-9302-824d2c2a86fa_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a73c4c83-f574-4dd1-bd04-2ea0e5da5546/tl-PH-6e2ec617-a20f-41e5-8cf2-de81e0da4f2b/tl-PH-961d7a42-8638-446e-b5cd-a21e55ae5784.m3u8"
},

ep52: {
  video: "https://video-v6.mydramawave.com/vt/02989c52-24fa-432f-af89-d80e2ae6f919/360_0/52_3d2804a0-7cc0-44f7-b58b-ffdd637cd27b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/02989c52-24fa-432f-af89-d80e2ae6f919/tl-PH-38a421b2-99bd-46af-a77b-2c378f650a20/tl-PH-f419115f-0e52-4d08-8575-d46e9a9349ec.m3u8"
},

ep53: {
  video: "https://video-v6.mydramawave.com/vt/18d81a1f-5dbe-492c-b40b-e0caccebc335/360_0/53_5c4219e2-f493-4b42-b4af-7ba13ac2b5de_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/18d81a1f-5dbe-492c-b40b-e0caccebc335/tl-PH-2af2fae6-36ab-4084-bccb-e34e469a366e/tl-PH-485e356c-8903-4525-81f6-d1753879c120.m3u8"
},

ep54: {
  video: "https://video-v81.mydramawave.com/vt/f4abc4af-d240-4669-af62-500e2c02316f/360_0/54_c99713ba-9e24-498b-989d-db4300cb7a01_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f4abc4af-d240-4669-af62-500e2c02316f/tl-PH-61f3aebc-b9e0-4467-ae0c-d878c8844dbf/tl-PH-c0f3362b-2409-4819-a42f-4d3d8dcf87dd.m3u8"
},

ep55: {
  video: "https://video-v81.mydramawave.com/vt/fe108c16-25a1-498b-80ed-cbdc327d0e23/360_0/55_97886709-ee68-4d64-a2c2-b826df0b66ed_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/fe108c16-25a1-498b-80ed-cbdc327d0e23/tl-PH-19d3d6c4-a2b6-4d29-9728-6d3a17e72655/tl-PH-8ca1fc9d-0bd6-4370-8343-fa8ab3a5c5fc.m3u8"
},

ep56: {
  video: "https://video-v6.mydramawave.com/vt/a20812c0-7211-4321-9768-3f342affbc8e/360_0/56_d6d8a98b-e801-4bad-b4e1-b2b26dfad3ba_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a20812c0-7211-4321-9768-3f342affbc8e/tl-PH-da443f4a-5de2-4610-8fb0-ec3dac0696f0/tl-PH-e8dbd1a8-1da0-4c77-b7eb-b354cf171cb6.m3u8"
},

ep57: {
  video: "https://video-v6.mydramawave.com/vt/aae43837-9cc9-4943-8f89-d92efe60c96d/360_0/57_dd01d018-7e0c-4194-9e90-b812e743a6de_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/aae43837-9cc9-4943-8f89-d92efe60c96d/tl-PH-1b8a44e8-d827-4f1b-bb92-ebc4c194b5b9/tl-PH-df79d584-73df-4da3-8961-122fcbf9e8c6.m3u8"
},

ep58: {
  video: "https://video-v6.mydramawave.com/vt/54de653a-e35d-47c7-9dd6-3bc4e040cace/360_0/58_fd46d704-405f-41d4-a537-ab0f4d7f21e6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/54de653a-e35d-47c7-9dd6-3bc4e040cace/tl-PH-9374dfc6-2bfa-48c4-93a8-197ccd8c22de/tl-PH-6a934696-6179-41e5-96b7-e9615c59b0bc.m3u8"
},

ep59: {
  video: "https://video-v81.mydramawave.com/vt/817a832d-23fb-40cc-b720-f330891cbc19/360_0/59_28a5d87f-f4f3-42e1-ac4f-2dfd5d57686d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/817a832d-23fb-40cc-b720-f330891cbc19/tl-PH-9e2a6b67-28a1-4388-b2d2-c9b505ecb50f/tl-PH-29e02ba6-ba87-423a-8ed5-d8db37e27381.m3u8"
},

ep60: {
  video: "https://video-v6.mydramawave.com/vt/3a885508-5aa0-4c38-885a-1ae4e2f7d9e6/360_0/60_a3117778-cca1-474f-9edb-ede9c12ecfa5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/3a885508-5aa0-4c38-885a-1ae4e2f7d9e6/tl-PH-d150a811-e251-4663-8480-7999ebfffea6/tl-PH-47f65ae5-286f-46c7-854a-1cafd4d24626.m3u8"
},
ep61: {
  video: "https://video-v81.mydramawave.com/vt/1b28372b-b1f2-4861-9766-16c9a2c042ab/360_0/61_0e685e2a-d9c4-4aac-8405-28fcacebb1f8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1b28372b-b1f2-4861-9766-16c9a2c042ab/tl-PH-11a91d74-3a2f-4837-baf1-2c0cdf8e0220/tl-PH-d48285a3-a3b2-4d2c-9bf1-982799969194.m3u8"
},

ep62: {
  video: "https://video-v6.mydramawave.com/vt/e29beb85-f3dd-41aa-b460-b105352af07a/360_0/62_ae2f4e50-c116-4279-b1a3-1327b3657363_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e29beb85-f3dd-41aa-b460-b105352af07a/tl-PH-4c3fe399-ebf8-4c54-a10d-996e5e971881/tl-PH-03230418-bb7f-4202-bc31-fdce6fb93923.m3u8"
},

ep63: {
  video: "https://video-v6.mydramawave.com/vt/86a6255a-a485-4340-91c9-b3c5fb1180c8/360_0/63_b988673f-004a-4f80-a81b-b11f813609d5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/86a6255a-a485-4340-91c9-b3c5fb1180c8/tl-PH-2895758f-0817-4706-bf20-5365f07a20f6/tl-PH-1b2bf78c-f681-43aa-bd69-e693a7bb93a5.m3u8"
},

ep64: {
  video: "https://video-v81.mydramawave.com/vt/8f4cf190-7ef3-4391-a78a-b3b2e143bcd4/360_0/64_364187cc-3338-4dbb-8b0f-39a3ea1e562a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8f4cf190-7ef3-4391-a78a-b3b2e143bcd4/tl-PH-2edf4400-d80c-455d-8713-e1f2d0a67469/tl-PH-6c32e826-aefc-4ccb-90fc-e73a15d43aa9.m3u8"
},

ep65: {
  video: "https://video-v81.mydramawave.com/vt/9d50d7aa-367e-4a47-b860-548a82c7f4db/360_0/65_bdf89144-a75f-41e4-a91c-f2c3edc15a6e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9d50d7aa-367e-4a47-b860-548a82c7f4db/tl-PH-51feac64-d5df-4d35-bba2-f2cd209f1ad3/tl-PH-9c1be789-dd67-47a8-bf24-ea2de9630c3c.m3u8"
},

ep66: {
  video: "https://video-v81.mydramawave.com/vt/1beda12a-9f53-4452-8f0d-d566b3c22b65/360_0/66_70a72a51-0696-451f-a4d7-74b7dcfcbee6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/1beda12a-9f53-4452-8f0d-d566b3c22b65/tl-PH-8eeaf0ae-6c66-46ba-9083-0e0a151696d3/tl-PH-b3001b5a-03e4-4396-baae-4680ff976251.m3u8"
},

ep67: {
  video: "https://video-v6.mydramawave.com/vt/2bd89f1a-6aba-4016-bfcb-9134824ed38a/360_0/67_d1169ace-1cab-49ad-9ef5-b145191e9587_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/2bd89f1a-6aba-4016-bfcb-9134824ed38a/tl-PH-61a1d92b-a164-444e-8701-db29ed60d3c3/tl-PH-6a1d049c-10b9-4e72-bac6-6d904f8cb513.m3u8"
},

ep68: {
  video: "https://video-v81.mydramawave.com/vt/ae8ca349-0aad-4931-9ab0-d0d9dc4780aa/360_0/68_d74c2dfc-588a-4d15-911a-42667679068f_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ae8ca349-0aad-4931-9ab0-d0d9dc4780aa/tl-PH-75172548-461b-4f42-b4aa-0c06b9548fbc/tl-PH-fa4882c1-1f3f-4ce4-a368-e0929e0e5d31.m3u8"
},

ep69: {
  video: "https://video-v6.mydramawave.com/vt/589d262a-ea7e-4ce8-9620-1c886fb2ed9f/360_0/69_58f997e2-b9e0-400b-b989-505ba197fdb2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/589d262a-ea7e-4ce8-9620-1c886fb2ed9f/tl-PH-1d7463a7-ab28-415a-b824-cf8494c9ac06/tl-PH-e37ff5a2-6860-44bf-adf6-b169cd238f93.m3u8"
},

ep70: {
  video: "https://video-v6.mydramawave.com/vt/9c538110-a16d-423e-a2cd-17885958608e/360_0/70_63268698-65c9-4318-b7b0-32e0f2b15c14_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9c538110-a16d-423e-a2cd-17885958608e/tl-PH-8c3c597c-24bd-4f4c-847c-60dfa3bc9f11/tl-PH-05c182da-9e6c-42ad-bcde-89a18c250519.m3u8"
},

ep71: {
  video: "https://video-v6.mydramawave.com/vt/f7ef1e8e-09c6-40d9-9b7a-948b2ddffecd/360_0/71_ffe4a7f8-bbbd-4c94-ac2a-b6bc346509aa_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f7ef1e8e-09c6-40d9-9b7a-948b2ddffecd/tl-PH-b9121576-ace1-451f-bfab-a136607445e9/tl-PH-001581ba-5089-475c-a513-26599a3df43a.m3u8"
},

ep72: {
  video: "https://video-v81.mydramawave.com/vt/9691fd9c-8431-49ec-bf65-79c396d6decf/360_0/72_506ea134-e2db-40e2-a071-9dabcd99fa15_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9691fd9c-8431-49ec-bf65-79c396d6decf/tl-PH-1cfc104d-d2ae-40cd-940b-8ea39bed4b03/tl-PH-be24e4aa-a6ea-42bc-9efd-67cb2e1eaa63.m3u8"
},

ep73: {
  video: "https://video-v6.mydramawave.com/vt/16179bbd-bad8-4602-a4da-b675561506fc/360_0/73_f12d3461-f6b5-475c-9b41-c2d2eba88881_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/16179bbd-bad8-4602-a4da-b675561506fc/tl-PH-1fe2f3d5-d68d-43c3-beb8-21fc4bca1afa/tl-PH-73ec806c-bd2b-4add-884b-31ce29e70a77.m3u8"
},

ep74: {
  video: "https://video-v6.mydramawave.com/vt/5d8738bc-90a4-4847-b33f-065ccbf70a17/360_0/74_7ae3cf9f-a87a-4847-a575-04e71c1bdd04_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5d8738bc-90a4-4847-b33f-065ccbf70a17/tl-PH-6d67cab5-75b8-45e8-bafc-6af495e55a46/tl-PH-2e4a6f66-2390-4592-b9a2-32e32661dbb6.m3u8"
},

ep75: {
  video: "https://video-v81.mydramawave.com/vt/11e361e4-24e6-4f7b-8d9d-acd43c1481f2/360_0/75_e44a1ddf-5731-4fce-b7dd-adf05f6260d3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/11e361e4-24e6-4f7b-8d9d-acd43c1481f2/tl-PH-92151ee3-dfc9-4c5f-bacc-b692b42d62a8/tl-PH-5e53cd4a-5ed3-4b0a-acbe-5aaa1bb2669e.m3u8"
},

ep76: {
  video: "https://video-v6.mydramawave.com/vt/8e221a4d-24fd-4b30-874a-e1e2f86dc4ea/360_0/76_2b1164c6-8a85-457e-b4fb-d6bee114c20e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8e221a4d-24fd-4b30-874a-e1e2f86dc4ea/tl-PH-18c0fbba-d3ea-409a-bcbf-fbdea736c9ba/tl-PH-460748c5-8c3f-4fc4-81ec-86a43db2bbd5.m3u8"
},

ep77: {
  video: "https://video-v81.mydramawave.com/vt/01312b8c-6271-43dd-870e-c2a0f0deb89c/360_0/77_8e790411-ad7b-44b7-9edd-1e3c3b5bd252_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/01312b8c-6271-43dd-870e-c2a0f0deb89c/tl-PH-271b7640-a3fb-42e9-8ff9-9dac8548f638/tl-PH-1690a0d8-1bba-4908-b58a-2187e5157639.m3u8"
},

ep78: {
  video: "https://video-v81.mydramawave.com/vt/63d2e1f6-df09-4885-a134-9c875e17cc15/360_0/78_6e088537-59f4-4a10-8d43-95b072c4d131_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/63d2e1f6-df09-4885-a134-9c875e17cc15/tl-PH-98f60809-2a06-48a8-9808-7c3a4fb3cffb/tl-PH-9b1d6b0f-acdc-419f-ba18-ecb124f47f4d.m3u8"
},

ep79: {
  video: "https://video-v6.mydramawave.com/vt/009c0642-d82d-4814-9e29-18df78cb8079/360_0/79_bd02cc00-7866-40ac-8772-a9901bd6c4d8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/009c0642-d82d-4814-9e29-18df78cb8079/tl-PH-b8d3fd89-47a8-4499-9548-a54fb2d75a16/tl-PH-8ebcf183-799f-4324-854e-62d091347717.m3u8"
},

ep80: {
  video: "https://video-v6.mydramawave.com/vt/1d7fe244-9952-44ae-8352-83755505a87b/360_0/80_91f71752-3281-4c8d-8bb0-7861333632f8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1d7fe244-9952-44ae-8352-83755505a87b/tl-PH-5744fbc9-c5e1-44ad-9732-02ee9c3c8eb0/tl-PH-65107c67-56bd-4f2e-b37a-779ed5461012.m3u8"
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
