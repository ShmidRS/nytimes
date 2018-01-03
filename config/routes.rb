Rails.application.routes.draw do
  root 'nytimes#index'

  namespace :api do
    namespace :v1 do
      post 'send_results' => 'send_results#create'
    end
  end
end
