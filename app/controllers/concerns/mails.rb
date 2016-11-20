module Mails
  extend ActiveSupport::Concern

  def get_contacts
    the_headers = {
      "Authorization" => "Bearer #{session[:tokens]["access_token"]}",
      "Host" => "crest-tq.eveonline.com",
      "Content-Type" => "application/json"
    }
    response = Unirest.get "https://crest-tq.eveonline.com/characters/#{session[:char_id]}/contacts/",
               headers:the_headers
  end

  def scrub_contacts(raw_contacts)
    raw_contacts.body["items"].map { |item| { name: item["character"]["name"], id: item["character"]["id_str"], standing: item["standing"] } if item["character"] }.select { |item| item }
  end

end