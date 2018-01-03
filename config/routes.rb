Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations', :omniauth_callbacks => "users/omniauth_callbacks" }

  root 'application#index'

  get 'workouts/current_week', to: 'workouts#current_week', as: 'workout_current_week'
  get 'workouts/reports', to: 'workouts#reports', as: 'workout_reports'
  get 'workouts/workout_ids', to: 'workouts#workout_ids', as: 'workout_ids'
  resources :workouts
  get 'workouts/:id/exercises', to: 'workouts#exercises', as: 'workout_exercises'

  resources :exercises
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
