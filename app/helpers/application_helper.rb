module ApplicationHelper

  def full_date(date)
    if date.in_time_zone.today?
      'Today'
    else
      date.strftime('%b %e, %y')
    end
  end

  def nav_bar_workout_login
    if user_signed_in?
      link_to('Workouts', workouts_path, class: "nav-link active")
    else
      link_to('Login', new_user_session_path, class: "nav-link active")
    end
  end

  def bootstrap_class_for(flash_type)
    case flash_type
    when 'success'
      'success'
    when 'error'
      'danger'
    when 'alert'
      'warning'
    when 'notice'
      'info'
    else
      flash_type.to_s
    end
  end


end
