require 'rest_client'
require 'pry'

values = '{
  "name":"BaubleBarEngagementDetails",
  "type": "engagement",
  "content_type": "application/xml",
  "email_recipient": {
      "enabled": true,
      "emails": ["james@salemove.com"]
  },
  "crm_recipient":{
      "enabled": true,
      "url": "https://zapier.com/hooks/catch/67402/u5vcyf/",
      "headers": {
        "Authorization": "API_KEY",
        "Accept": "application/xml"
      }
  },
"template": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<export><BaubleBar><id>{engagement_id}</id>\n<DocumentType>\"Correspondance\"</DocumentType>\n<DocumentSubType>\"Chat Transcript\"</DocumentSubType>\n<DocumentDate>{engagement_started_at}</DocumentDate>\n<ChatTranscript><session><id>{engagement_id}</id>\n<source>\"BaubleBar Engagment Production Site\"</source>\n<provider><contact><operator><name>{operator_names}</name>\n</operator></contact></provider></session><requestdate>{engagement_started_at}</requestdate>\n<duration>{engagement_duration}</duration>\n<startedBy>{engagement_type}</startedBy>\n<endedBy>{end_reason}</endedBy>\n<video_used>{video_used}</video_used>\n<audio_used>{audio_used}</audio_used>\n<crm_forwarded>{crm_forwarded}</crm_forwarded>\n<summary_forwarded>{summary_forwarded}</summary_forwarded>\n</ChatTranscript><visitor><contact><name>{visitor_name}</name>\n<email>{visitor_email}</email>\n<phone>{visitor_phone}</phone>\n<notes>{notes}</notes>\n</contact></visitor><customer><contact><name>{visitor_name}</name>\n</contact><transcript>{chat_transcript}</transcript>\n</customer></BaubleBar></export>"
  }'

headers = {
  :authorization => 'Token API_KEY',
  :accept => 'application/vnd.salemove.v1+json'
}
response = RestClient.put 'https://api.salemove.com/sites/SITE_ID/crm/exports/CRM_EXPORT_ID', values, headers
puts response