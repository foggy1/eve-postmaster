class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :authorized?
  def authorized?
    return false unless @tokens
    !!@tokens.values[0]
  end
  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
