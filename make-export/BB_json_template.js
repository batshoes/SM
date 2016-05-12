{
  "BaubleBar": {
    "id": {engagement_id},
    "DocumentType": "Correspondence",
    "DocumentSubType": "Chat Transcript",
    "DocumentDate": {engagement_started_at},
    "ChatTranscript": {
      "session": {
        "id": {engagement_id},
        "source": "BaubleBar Engagment",
        "provider": {
          "contact": {
            "operator": { "name": {operator_names} }
          }
        },
        "requestdate": {engagement_started_at},
        "duration": {engagement_duration},
        "startedBy": {engagement_type},
        "endedBy": {end_reason},
        "video_used": {video_used},
        "audio_used": {audio_used},
        "crm_forwarded": {crm_forwarded},
        "summary_forwarded": {summary_forwarded}
      },
      "visitor": {
        "contact": {
          "name": {visitor_name},
          "email": {visitor_email},
          "phone": {visitor_phone},
          "notes": {notes}
        }
      },
      "customer": {
        "contact": { "name": {visitor_name} },
        "transcript": {chat_transcript}
        "claim": {
          "custom_fields": {custom_fields}
        }
      }
    }
  }
}