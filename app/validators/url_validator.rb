# -*- encoding : utf-8 -*-
class UrlValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    begin
      uri = URI.parse(value)
      resp = uri.kind_of?(URI::HTTP)
    rescue URI::InvalidURIError
      resp = false
    end
    unless resp == true
      record.errors[attribute] << (options[:message] || "não é uma URL")
    end
  end
end
